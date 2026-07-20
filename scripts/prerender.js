/**
 * Post-build step: give every route its own static HTML file.
 *
 * The app is a client-rendered SPA, so the shipped index.html carries one
 * generic title and an empty <div id="root">. Crawlers and link unfurlers that
 * do not run JavaScript therefore see the same thing for all 20-odd pages. This
 * rewrites the <head> per route and drops the result at build/<route>/index.html,
 * then writes sitemap.xml and robots.txt.
 *
 * It only fills in the <head>; the body still renders client-side. That is
 * enough for titles, descriptions and social previews, which is what the
 * Simplebooklet pages this replaces used to provide.
 *
 * Runs automatically after `npm run build` via the postbuild script.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BUILD = path.join(ROOT, "build");
const SITE = "https://www.sutongctr.com";
const BRAND = "Sutong Tire Resources";

const STATIC_ROUTES = [
  {
    route: "/",
    title: `${BRAND}, Inc — Tires, Wheels & Assemblies Since 1993`,
    description:
      "Sutong Tire Resources supplies tires, wheels and assemblies across the US and Canada, serving the utility and RV trailer industry, national retail chains and independent tire retailers.",
  },
  {
    route: "/about",
    title: `About — ${BRAND}`,
    description:
      "Founded in 1993, Sutong Tire Resources sources globally and distributes from Brookshire TX, Anderson IN and Vaughan ON.",
  },
  {
    route: "/catalog",
    title: `Tire Catalog & Brochures — ${BRAND}`,
    description:
      "Browse brochures for Synergy, Long March, SuperCargo, RoadOne, Hemisphere, Hi-Run, Caraway and Wolf Pack — medium truck, trailer, passenger, L&G, ATV/UTV and tube.",
  },
  {
    route: "/careers",
    title: `Careers — ${BRAND}`,
    description: `Open positions at ${BRAND}.`,
  },
  {
    route: "/news",
    title: `News — ${BRAND}`,
    description: `Company news and industry updates from ${BRAND}.`,
  },
  {
    route: "/contact",
    title: `Contact — ${BRAND}`,
    description:
      "Get in touch with Sutong Tire Resources — Brookshire TX, Anderson IN and Vaughan ON.",
  },
  {
    route: "/warranty",
    title: `Limited Warranty — ${BRAND}`,
    description:
      "Limited Warranty documents for Synergy, Long March, SuperCargo, Cavalry, RoadOne, Hemisphere and Hi-Run tires.",
  },
];

/** Brochure routes come from the meta.json each build_brochure.py run writes. */
function brochureRoutes() {
  const dir = path.join(ROOT, "public", "brochures");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name, "meta.json"))
    .filter(fs.existsSync)
    .map((file) => JSON.parse(fs.readFileSync(file, "utf8")))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((m) => ({
      route: `/brochures/${m.id}`,
      title: `${m.title} Brochure — ${BRAND}`,
      description: `${m.title} tire brochure from ${BRAND}: ${m.pages} pages of sizes, specifications and load ratings. Read online or download the PDF.`,
      image: `/brochures/${m.id}/cover.jpg`,
      dirServed: true,
    }));
}

function warrantyRoutes() {
  const file = path.join(ROOT, "src", "components", "config", "warranty.json");
  return JSON.parse(fs.readFileSync(file, "utf8")).map((w) => ({
    route: `/warranty/${w.id}`,
    title: `${w.brand} ${w.line} Limited Warranty — ${BRAND}`,
    description: `The Limited Warranty covering ${w.brand} ${w.line} tires from ${BRAND}. Read online or download the PDF.`,
    dirServed: true,
  }));
}

const escape = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Amplify serves a `dirServed` route from its directory index, and redirects
 * the slashless form there, so the canonical URL has to carry the slash or it
 * points at a 301.
 */
function canonicalUrl({ route, dirServed }) {
  if (route === "/") return `${SITE}/`;
  return `${SITE}${route}${dirServed ? "/" : ""}`;
}

function headFor(page) {
  const { title, description, image } = page;
  const url = canonicalUrl(page);
  const img = `${SITE}${image || "/apple-touch-icon.jpg"}`;
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(BRAND)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(title)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ].join("\n    ");
}

function render(shell, page) {
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, headFor(page))
    .replace(/\s*<meta name="description"[\s\S]*?\/>/, "");
}

function main() {
  const indexPath = path.join(BUILD, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("prerender: build/index.html missing — run the build first");
    process.exit(1);
  }

  const shell = fs.readFileSync(indexPath, "utf8");
  if (!/<title>/.test(shell)) {
    console.error("prerender: no <title> in the shell to replace");
    process.exit(1);
  }

  const pages = [...STATIC_ROUTES, ...brochureRoutes(), ...warrantyRoutes()];

  for (const page of pages) {
    const html = render(shell, page);
    const dest =
      page.route === "/"
        ? indexPath
        : path.join(BUILD, page.route, "index.html");
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map((page) =>
      [
        "  <url>",
        `    <loc>${canonicalUrl(page)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        "  </url>",
      ].join("\n")
    ),
    "</urlset>",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(BUILD, "sitemap.xml"), sitemap);

  fs.writeFileSync(
    path.join(BUILD, "robots.txt"),
    ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE}/sitemap.xml`, ""].join(
      "\n"
    )
  );

  console.log(
    `prerender: ${pages.length} routes (${STATIC_ROUTES.length} static, ` +
      `${brochureRoutes().length} brochures, ${warrantyRoutes().length} warranties)` +
      " + sitemap.xml + robots.txt"
  );
}

main();
