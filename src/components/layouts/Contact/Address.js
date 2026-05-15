import { Fragment } from "react";
import styles from "./Address.module.css";

const Address = ({ title, addressLines = [], phone, tollFree, fax }) => (
  <div className={styles.address}>
    <h3 className={styles.title}>{title}</h3>
    <h4 className={styles.subTitle}>Address:</h4>
    <p className={styles.description}>
      {addressLines.map((line, i) => (
        <Fragment key={line}>
          {line}
          {i < addressLines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
    <h4 className={styles.subTitle}>Phone:</h4>
    <p className={styles.description}>
      <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className={styles.phoneLink}>
        {phone}
      </a>
    </p>
    {tollFree && (
      <>
        <h4 className={styles.subTitle}>Toll Free:</h4>
        <p className={styles.description}>
          <a href={`tel:${tollFree.replace(/[^+\d]/g, "")}`} className={styles.phoneLink}>
            {tollFree}
          </a>
        </p>
      </>
    )}
    {fax && (
      <>
        <h4 className={styles.subTitle}>Fax:</h4>
        <p className={styles.description}>{fax}</p>
      </>
    )}
  </div>
);

export default Address;
