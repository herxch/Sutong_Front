import styles from "./PageLoader.module.css";

const PageLoader = () => (
  <div className={styles.loader} role="status" aria-live="polite">
    <div className={styles.spinner} aria-hidden="true" />
    <span className={styles.srOnly}>Loading…</span>
  </div>
);

export default PageLoader;
