import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

const Lightbox = ({ src, caption, onClose }) => {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <button className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>
      {caption && <span className={styles.caption}>{caption}</span>}
      <img
        className={`${styles.img} ${zoomed ? styles.zoomed : ""}`}
        src={src}
        alt={caption || "Detail"}
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
      <span className={styles.hint}>
        {zoomed ? "Drag to pan · click to zoom out" : "Click image to zoom"}
      </span>
    </div>
  );
};

export default Lightbox;
