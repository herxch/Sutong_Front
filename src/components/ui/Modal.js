import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const VARIANT_ICON = {
  success: "✓",
  error: "!",
  info: "i",
};

const Backdrop = ({ onClose }) => (
  <div className={styles.backdrop} onClick={onClose} />
);

const ModalDialog = ({ title, message, variant = "info", onClose, confirmLabel = "OK" }) => (
  <div
    className={`${styles.modal} ${styles[variant]}`}
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-message"
  >
    <div className={styles.iconWrap} aria-hidden="true">
      <span className={styles.icon}>{VARIANT_ICON[variant]}</span>
    </div>
    <h2 id="modal-title" className={styles.title}>
      {title}
    </h2>
    <p id="modal-message" className={styles.message}>
      {message}
    </p>
    <button type="button" className={styles.button} onClick={onClose} autoFocus>
      {confirmLabel}
    </button>
  </div>
);

const Modal = ({ open, onClose, ...rest }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const backdropRoot = document.getElementById("backdrop-root");
  const overlayRoot = document.getElementById("overlay-root");
  if (!backdropRoot || !overlayRoot) return null;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, backdropRoot)}
      {ReactDOM.createPortal(<ModalDialog onClose={onClose} {...rest} />, overlayRoot)}
    </>
  );
};

export default Modal;
