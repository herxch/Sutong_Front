// Limited Warranty documents, served as PDFs from /public/warranty/<id>.pdf.
// They are short legal texts, so the PDF stays authoritative rather than being
// rendered to images the way brochures are (see config/brochures.js).
//
// The list lives in warranty.json because scripts/prerender.js reads it too,
// and duplicating it would let the two drift.
import warranties from "./warranty.json";

export const WARRANTIES = warranties;

export const warrantyPdf = (id) => `/warranty/${id}.pdf`;

export const getWarranty = (id) => WARRANTIES.find((w) => w.id === id);
