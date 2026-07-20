import { Link } from "react-router-dom";
import styles from "./Warranty.module.css";
import { WARRANTIES } from "../../config/warranty";

const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="14"
    height="14"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

const Warranty = () => (
  <div className={styles.warranty}>
    <h1 className={styles.title}>Limited Warranty</h1>
    <div className={styles.container}>
      <p className={styles.intro}>
        Select a product line to read its Limited Warranty. Each document is
        also available to download or print.
      </p>
      <ul className={styles.list}>
        {WARRANTIES.map((w) => (
          <li key={w.id}>
            <Link
              to={`/warranty/${w.id}`}
              className={styles.row}
              aria-label={`Read the ${w.brand} ${w.line} Limited Warranty`}
            >
              <span className={styles.names}>
                <span className={styles.brand}>{w.brand}</span>
                <span className={styles.line}>{w.line}</span>
              </span>
              <span className={styles.cta}>
                Read Warranty
                <ArrowIcon className={styles.ctaArrow} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Warranty;
