/**
 * Shared contact form handler for sutongctr.com, synergytire.com and
 * hemispheretires.com. Validates input, verifies reCAPTCHA server-side, and
 * relays the message through Mailgun.
 *
 * Deployed as a Lambda Function URL. Each site proxies to it from /api/contact
 * via an Amplify rewrite, so requests arrive same-origin.
 *
 * The three forms do not share a field layout, so rather than encoding each
 * one here, only the fields common to all of them are required and anything
 * else submitted is rendered in the order below. A new site needs an entry in
 * SITES and nothing more.
 *
 * Required environment variables:
 *   MAILGUN_API_KEY    Mailgun private API key
 *   MAILGUN_DOMAIN     verified sending domain, e.g. relay.sutongctr.com
 *   RECAPTCHA_SECRET   reCAPTCHA secret (one key covers all three domains)
 *   TO_EMAIL           where submissions land
 *   FROM_EMAIL         bare address, e.g. no-reply@relay.sutongctr.com
 * Optional:
 *   MAILGUN_BASE_URL   https://api.eu.mailgun.net for EU accounts
 *                      (default https://api.mailgun.net)
 */

const SITES = {
  sutong: "Sutong Website Contact Form",
  synergy: "Synergy Tire Website",
  hemisphere: "Hemisphere Tires Website",
};
const DEFAULT_SITE = "sutong";

// Every form collects at least these three.
const REQUIRED_FIELDS = ["name", "email", "message"];

// Render order for the notification body. Fields absent from a given form are
// simply skipped; `message` is rendered separately as a block at the end.
const FIELD_LABELS = {
  name: "Name",
  companyName: "Company",
  phone: "Phone",
  email: "Email",
  category: "Category",
  subject: "Subject",
};

const MAX_LENGTH = {
  name: 100,
  companyName: 150,
  phone: 40,
  email: 254,
  category: 100,
  subject: 200,
  message: 5000,
};
const DEFAULT_MAX_LENGTH = 200;

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
  for (const field of REQUIRED_FIELDS) {
    if (!String(data[field] ?? "").trim()) errors.push(`${field} is required`);
  }
  if (data.email && !EMAIL_RE.test(String(data.email).trim())) {
    errors.push("email is invalid");
  }
  // Length-check everything present, not just the required fields, so an
  // oversized optional field cannot pad the message body.
  for (const [field, value] of Object.entries(data)) {
    if (field === "source" || typeof value !== "string") continue;
    const limit = MAX_LENGTH[field] ?? DEFAULT_MAX_LENGTH;
    if (value.length > limit) errors.push(`${field} exceeds ${limit} characters`);
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

const buildBody = (data, meta) => {
  const lines = [];
  for (const [field, label] of Object.entries(FIELD_LABELS)) {
    const value = String(data[field] ?? "").trim();
    if (value) lines.push(`${label.padEnd(12)}${value}`);
  }
  lines.push("", "Message:", String(data.message).trim(), "");
  lines.push("---");
  lines.push(`Site:       ${meta.siteLabel}`);
  lines.push(`Submitted:  ${meta.timestamp}`);
  lines.push(`Source IP:  ${meta.ip}`);
  lines.push(`User agent: ${meta.userAgent}`);
  return lines.join("\n");
};

const sendMail = async (data, meta) => {
  const baseUrl = process.env.MAILGUN_BASE_URL || "https://api.mailgun.net";
  const domain = process.env.MAILGUN_DOMAIN;

  // Tolerate FROM_EMAIL being either a bare address or "Name <address>".
  const fromAddress = (process.env.FROM_EMAIL.match(/<([^>]+)>/)?.[1] ?? process.env.FROM_EMAIL).trim();

  const subject = oneLine(data.subject) || oneLine(data.category) || "Website enquiry";

  const form = new URLSearchParams({
    from: `${meta.siteLabel} <${fromAddress}>`,
    to: process.env.TO_EMAIL,
    subject: `[${meta.siteLabel}] ${subject}`,
    text: buildBody(data, meta),
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

  // Only picks the label and subject prefix, so an unrecognised value is
  // harmless — the recipient is fixed by TO_EMAIL either way.
  const siteLabel = SITES[body.source] ?? SITES[DEFAULT_SITE];

  try {
    const result = await sendMail(body, {
      ip,
      siteLabel,
      timestamp: new Date().toISOString(),
      userAgent: event.headers?.["user-agent"] ?? "unknown",
    });
    // Correlates with the Mailgun dashboard, which is searchable by recipient,
    // so delivery can be traced without logging the submitter's details here.
    console.log(`Mailgun accepted message from ${siteLabel}:`, result.id);
  } catch (err) {
    console.error("Mailgun send failed:", err);
    return json(502, { error: "Could not send message" });
  }

  return json(200, { ok: true });
};
