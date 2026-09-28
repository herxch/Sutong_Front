import { useEffect } from "react";
import styles from "./Gallery.module.css";

const PUBLIC = process.env.PUBLIC_URL || "";

export const formatMB = (bytes) => {
  const mb = bytes / 1e6;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
};

// "p. 4", "pp. 2–5", "pp. 2, 13"
const pageList = (pages) => {
  if (!pages.length) return null;
  if (pages.length === 1) return `p. ${pages[0]}`;
  const run = pages.every((p, i) => i === 0 || p === pages[i - 1] + 1);
  return `pp. ${run ? `${pages[0]}–${pages[pages.length - 1]}` : pages.join(", ")}`;
};

// Every pattern in the brochure at a glance, for visitors who came for the
// photos rather than the pages.
const Gallery = ({ title, images, onOpen, onClose, paused }) => {
  const photos = images.patterns.reduce((n, p) => n + p.views.length, 0);

  useEffect(() => {
    if (paused) return undefined; // the viewer on top owns the keyboard
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, paused]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-label={`${title} photos`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.head}>
          <div>
            <h2 className={styles.title}>{title} · Tire Photos</h2>
            <p className={styles.sub}>
              {images.patterns.length} patterns · {photos} photos · transparent
              PNG
            </p>
          </div>
          <a
            className={styles.zip}
            href={`${PUBLIC}${images.zip.url}`}
            download={images.zip.filename}
          >
            ↓ Download all ({formatMB(images.zip.bytes)} ZIP)
          </a>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <ul className={styles.grid}>
          {images.patterns.map((p, i) => (
            <li key={p.id}>
              <button className={styles.card} onClick={() => onOpen(i)}>
                <span className={styles.thumb}>
                  <img
                    src={`${PUBLIC}${p.views[p.cover ?? 0].thumb}`}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                </span>
                <span className={styles.label}>{p.label}</span>
                <span className={styles.meta}>
                  {[
                    pageList(p.pages),
                    `${p.views.length} photo${p.views.length > 1 ? "s" : ""}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
