import styles from "./Location.module.css";

const Location = ({ title, description, photo }) => {
  return (
    <div className={styles.location}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.photoContainer}>
        <img src={photo} alt={title} className={styles.photo} />
      </div>
    </div>
  );
};
export default Location;
