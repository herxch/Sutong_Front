// Limited Warranty documents, served as PDFs from /public/warranty/<id>.pdf.
// They are short legal texts, so the PDF stays authoritative rather than being
// rendered to images the way brochures are (see config/brochures.js).
export const WARRANTIES = [
  { id: "synergy-mtr", brand: "Synergy", line: "MTR", pages: 2 },
  { id: "longmarch-mtr", brand: "Long March", line: "MTR", pages: 2 },
  { id: "supercargo-mtr", brand: "SuperCargo", line: "MTR", pages: 2 },
  { id: "cavalry-mtr", brand: "Cavalry", line: "MTR", pages: 2 },
  { id: "roadone-mtr", brand: "RoadOne", line: "MTR", pages: 2 },
  {
    id: "roadone-passenger",
    brand: "RoadOne",
    line: "Passenger & Light Truck",
    pages: 3,
  },
  {
    id: "hemisphere-passenger",
    brand: "Hemisphere",
    line: "Passenger & Light Truck",
    pages: 3,
  },
  { id: "specialty-tire", brand: "Hi-Run", line: "Specialty Tire", pages: 1 },
];

export const warrantyPdf = (id) => `/warranty/${id}.pdf`;

export const getWarranty = (id) => WARRANTIES.find((w) => w.id === id);
