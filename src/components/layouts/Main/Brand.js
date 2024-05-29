import styles from "./Brand.module.css";

const Brand = ({ name, description, logo, url }) => {
  return (
    <div className={styles.brand}>
      {/* <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p> */}
      <div className={styles.logoContainer}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={logo} alt={name} className={styles.logo} />
          <p className={styles.description}>{description}</p>
        </a>
      </div>
    </div>
  );
};

export default Brand;
