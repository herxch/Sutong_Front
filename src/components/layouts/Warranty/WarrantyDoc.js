import { Link } from "react-router-dom";
import styles from "./WarrantyDoc.module.css";
import { warrantyPdf } from "../../config/warranty";

const PUBLIC = process.env.PUBLIC_URL || "";

const WarrantyDoc = ({ warranty }) => {
  const src = `${PUBLIC}${warrantyPdf(warranty.id)}`;
  const label = `${warranty.brand} ${warranty.line}`;

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/warranty" className={styles.back}>
          ‹ All Warranties
        </Link>
        <h1 className={styles.title}>{label} Limited Warranty</h1>
        <a className={styles.download} href={src} download>
          ↓ Download PDF
        </a>
      </header>

      {/* An <object> lets the browser use its own PDF viewer, so the legal text
          stays selectable, searchable and printable. */}
      <object
        className={styles.viewer}
        data={src}
        type="application/pdf"
        aria-label={`${label} Limited Warranty, ${warranty.pages} pages`}
      >
        <p className={styles.fallback}>
          Your browser cannot display PDFs inline.{" "}
          <a href={src} download>
            Download the {label} Limited Warranty
          </a>{" "}
          instead.
        </p>
      </object>
    </section>
  );
};

export default WarrantyDoc;
