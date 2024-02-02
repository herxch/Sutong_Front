import styles from "./Address.module.css";

const Address = ({ title, address, phone, tollFree = "", fax = "" }) => {
  return (
    <div className={styles.address}>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.subTitle}>Address:</h4>
      <p className={styles.description}>{address}</p>
      <h4 className={styles.subTitle}>Phone:</h4>
      <p className={styles.description}>{phone}</p>
      {tollFree && <h4 className={styles.subTitle}>Toll Free:</h4>}
      {tollFree && <p className={styles.description}>{tollFree}</p>}
      {fax && <h4 className={styles.subTitle}>Fax:</h4>}
      {fax && <p className={styles.description}>{fax}</p>}
    </div>
  );
};
export default Address;
