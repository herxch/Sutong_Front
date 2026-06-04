// Registry of self-hosted flipbook brochures.
// Page images:   /public/brochures/<id>/page-XX.<ext>   (rendered from the PDF)
// Tire hi-res:   /public/brochures/<id>/tires/<CODE>.webp
// Zoom hotspots: /public/brochures/<id>/hotspots.json   (auto-generated, fetched at runtime)
export const BROCHURES = {
  "wolfpack-atvutv": {
    id: "wolfpack-atvutv",
    title: "WolfPack ATV / UTV",
    basePath: "/brochures/wolfpack-atvutv",
    pages: 18,
    ext: "webp",
    pdfUrl: "/brochures/wolfpack-atvutv/source.pdf",
    logo: {
      label: "WolfPack",
      svg: "/brochures/wolfpack-atvutv/logo/wolfpack.svg",
      png: "/brochures/wolfpack-atvutv/logo/wolfpack.png",
    },
  },
};

export const getBrochure = (id) => BROCHURES[id];
