// Old Simplebooklet slugs from catalog.sutongctr.com.
//
// The Amplify redirect for that subdomain appends the original path, so
// catalog.sutongctr.com/roadonemtrbrochure arrives here as /catalog/roadonemtrbrochure.
// Mapping the slugs in the app rather than in Amplify keeps the rewrite rules
// well under their limit -- there are more old slugs than rules to spare.
//
// Anything unrecognised falls back to the catalog itself, so printed links and
// QR codes cannot dead-end.
export const LEGACY_CATALOG_PATHS = {
  // brochures, in the order they appeared on the portal
  roadonemtrbrochure: "/brochures/roadone-mtr",
  roadonepassengerlighttruckbrochure: "/brochures/roadone-plt",
  supercargomtrbrochure: "/brochures/supercargo-mtr",
  supercargstrbrochure: "/brochures/supercargo-str",
  longmarchmtrbrochure: "/brochures/longmarch-mtr",
  synergystrbrochure: "/brochures/synergy-str",
  synergylettersizebrochure: "/brochures/synergy-mtr",
  hemispherepassengerlighttruckbrochure: "/brochures/hemisphere-plt",
  hi_runsttire: "/brochures/hirun-st",
  specialtytirebrochure: "/brochures/hirun-specialty",
  atvutvtirebrochure: "/brochures/hirun-atvutv",
  wolfpackatvutv: "/brochures/wolfpack-atvutv",
  carawaysttire: "/brochures/caraway-st",
  hiruntubeapplicationguideforusa: "/brochures/hirun-tube",

  // brand collection pages -> the matching card on the catalog
  synergy: "/catalog#synergy",
  supercargo: "/catalog#supercargo",
  roadone: "/catalog#roadone",
  hemisphere: "/catalog#hemisphere",
  hirun: "/catalog#hirun",
  specialtylg: "/catalog#hirun", // renamed to /hirun in Jan 2025
  wolfpack: "/catalog#wolfpack",

  // booklets that were never linked from the site and did not migrate
  aluminumwheel: "/catalog",
  forgedwheellettersizebrochur: "/catalog",
  tireandwheelassemblyforgolf: "/catalog",
  wheelbarrowtireassemblybrochure: "/catalog",
  moreinfo: "/catalog",
};

export const legacyCatalogTarget = (slug) =>
  LEGACY_CATALOG_PATHS[String(slug).toLowerCase()] || "/catalog";
