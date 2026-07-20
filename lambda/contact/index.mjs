/**
 * Contact form handler: validates input, verifies reCAPTCHA server-side,
 * and relays the message through Mailgun.
 *
 * Deployed as a Lambda Function URL and proxied from the site at /api/contact
 * via an Amplify rewrite, so requests arrive same-origin.
 *
 * Required environment variables:
 *   MAILGUN_API_KEY    Mailgun private API key
 *   MAILGUN_DOMAIN     verified sending domain, e.g. sutongctr.com
 *   RECAPTCHA_SECRET   reCAPTCHA v2 secret key (pairs with the site key)
 *   TO_EMAIL           where submissions land
 *   FROM_EMAIL         e.g. "Sutong Website <noreply@sutongctr.com>"
 * Optional:
 *   MAILGUN_BASE_URL   https://api.eu.mailgun.net for EU accounts
 *                      (default https://api.mailgun.net)
 */

const FIELDS = ["name", "companyName", "phone", "email", "subject", "message"];

const MAX_LENGTH = {
  name: 100,
  companyName: 150,
  phone: 40,
  email: 254,
  subject: 200,
  message: 5000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 5;

// Per-container only, so this is a speed bump for naive floods rather than a
// real quota. reCAPTCHA is the actual gate.
const recentHits = new Map();

const isRateLimited = (ip) => {
  const now = Date.now();
  const seen = recentHits.get(ip);
  if (!seen || now - seen.start > RATE_WINDOW_MS) {
    recentHits.set(ip, { start: now, count: 1 });
    return false;
  }
  seen.count += 1;
  return seen.count > RATE_MAX_PER_WINDOW;
};

// Values interpolated into mail headers must not carry CRLF, or a submitter
// could inject extra headers (extra recipients, spoofed Reply-To).
const oneLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

const validate = (data) => {
  const errors = [];
  for (const field of FIELDS) {
    const value = String(data[field] ?? "").trim();
    if (!value) {
      errors.push(`${field} is required`);
    } else if (value.length > MAX_LENGTH[field]) {
      errors.push(`${field} exceeds ${MAX_LENGTH[field]} characters`);
    }
  }
  if (data.email && !EMAIL_RE.test(String(data.email).trim())) {
    errors.push("email is invalid");
  }
  return errors;
};

const verifyRecaptcha = async (token, ip) => {
  const params = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET,
    response: token,
  });
  if (ip) params.set("remoteip", ip);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params,
  });
  if (!res.ok) throw new Error(`reCAPTCHA verify returned ${res.status}`);

  const result = await res.json();
  if (!result.success) {
    console.warn("reCAPTCHA rejected:", result["error-codes"]);
  }
  return result.success === true;
};

const sendMail = async (data, meta) => {
  const baseUrl = process.env.MAILGUN_BASE_URL || "https://api.mailgun.net";
  const domain = process.env.MAILGUN_DOMAIN;

  const text = [
    `Name:         ${data.name}`,
    `Company:      ${data.companyName}`,
    `Phone:        ${data.phone}`,
    `Email:        ${data.email}`,
    `Subject:      ${data.subject}`,
    "",
    "Message:",
    data.message,
    "",
    "---",
    `Submitted:    ${meta.timestamp}`,
    `Source IP:    ${meta.ip}`,
    `User agent:   ${meta.userAgent}`,
  ].join("\n");

  const form = new URLSearchParams({
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `[Website] ${oneLine(data.subject)}`,
    text,
    // Lets staff reply straight to the sender from their mail client.
    "h:Reply-To": `${oneLine(data.name)} <${oneLine(data.email)}>`,
  });

  const auth = Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString("base64");
  const res = await fetch(`${baseUrl}/v3/${domain}/messages`, {
    method: "POST",
    headers: {
      authorization: `Basic ${auth}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`Mailgun returned ${res.status}: ${await res.text()}`);
  }
  return res.json();
};

export const handler = async (event) => {
  const http = event.requestContext?.http ?? {};
  const ip = http.sourceIp ?? "unknown";

  if (http.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const missing = [
    "MAILGUN_API_KEY",
    "MAILGUN_DOMAIN",
    "RECAPTCHA_SECRET",
    "TO_EMAIL",
    "FROM_EMAIL",
  ].filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error("Missing environment variables:", missing.join(", "));
    return json(500, { error: "Server is not configured" });
  }

  let body;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf8")
      : event.body;
    body = JSON.parse(raw ?? "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  // Hidden field real users never see. Bots that fill every input get a 200
  // so they have no signal to retry, but nothing is sent.
  if (String(body.website ?? "").trim()) {
    console.warn("Honeypot triggered from", ip);
    return json(200, { ok: true });
  }

  if (isRateLimited(ip)) {
    return json(429, { error: "Too many requests. Please try again shortly." });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return json(400, { error: "Validation failed", details: errors });
  }

  const token = body["g-recaptcha-response"];
  if (!token) {
    return json(400, { error: "Missing reCAPTCHA response" });
  }

  try {
    if (!(await verifyRecaptcha(token, ip))) {
      return json(400, { error: "reCAPTCHA verification failed" });
    }
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return json(502, { error: "Could not verify reCAPTCHA" });
  }

  try {
    await sendMail(body, {
      ip,
      timestamp: new Date().toISOString(),
      userAgent: event.headers?.["user-agent"] ?? "unknown",
    });
  } catch (err) {
    console.error("Mailgun send failed:", err);
    return json(502, { error: "Could not send message" });
  }

  return json(200, { ok: true });
};
