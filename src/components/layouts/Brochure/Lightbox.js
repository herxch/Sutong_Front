import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

const PUBLIC = process.env.PUBLIC_URL || "";

// Every photo of one tire pattern: the angles step with the arrows or the strip
// below, each can be zoomed, and each downloads as the original PNG.
const Lightbox = ({ pattern, title, onClose, onGoToPage }) => {
  const [index, setIndex] = useState(pattern.cover ?? 0);
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef(null);

  const views = pattern.views;
  const view = views[index];
  const many = views.length > 1;

  const show = useCallback(
    (i) => {
      setIndex((i + views.length) % views.length);
      setZoomed(false);
      setPos({ x: 0, y: 0 });
    },
    [views.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, show, index]);

  const toggleZoom = useCallback((e) => {
    e.stopPropagation();
    setZoomed((z) => !z);
    setPos({ x: 0, y: 0 });
  }, []);

  const onMouseDown = (e) => {
    if (!zoomed) return;
    drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onMouseMove = (e) => {
    if (!drag.current) return;
    setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
  };
  const endDrag = () => (drag.current = null);
  const stop = (e) => e.stopPropagation();

  const page = pattern.pages[0];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.header} onClick={stop}>
        <span className={styles.caption}>
          {title} · {pattern.label}
          {view.label && <span className={styles.viewLabel}>{view.label}</span>}
        </span>
        {many && (
          <span className={styles.count}>
            {index + 1} / {views.length}
          </span>
        )}
      </div>
      <button className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>

      {many && (
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={(e) => {
            stop(e);
            show(index - 1);
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>
      )}
      <img
        key={view.src}
        className={`${styles.img} ${zoomed ? styles.zoomed : ""}`}
        src={`${PUBLIC}${view.src}`}
        width={view.w}
        height={view.h}
        alt={`${pattern.label} ${view.label}`.trim()}
        style={
          zoomed
            ? { transform: `translate(${pos.x}px, ${pos.y}px) scale(2)` }
            : undefined
        }
        onClick={toggleZoom}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        draggable={false}
      />
      {many && (
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={(e) => {
            stop(e);
            show(index + 1);
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      )}

      <div className={styles.footer} onClick={stop}>
        {many && (
          <div className={styles.strip}>
            {views.map((v, i) => (
              <button
                key={v.thumb}
                className={`${styles.thumb} ${i === index ? styles.current : ""}`}
                onClick={() => show(i)}
                aria-label={`Photo ${i + 1}${v.label ? ` (${v.label})` : ""}`}
              >
                <img src={`${PUBLIC}${v.thumb}`} alt="" draggable={false} />
              </button>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <a
            className={styles.action}
            href={`${PUBLIC}${view.original}`}
            download={view.filename}
          >
            ↓ Download photo ({(view.bytes / 1e6).toFixed(1)} MB)
          </a>
          {onGoToPage && page && (
            <button className={styles.action} onClick={() => onGoToPage(page)}>
              Go to page {page}
            </button>
          )}
          <span className={styles.hint}>
            {zoomed ? "Drag to pan · click to zoom out" : "Click photo to zoom"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
