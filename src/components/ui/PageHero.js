import styles from "./PageHero.module.css";

const PageHero = ({ image, title, kicker, focal = "center" }) => (
  <header
    className={styles.hero}
    style={{
      backgroundImage: `linear-gradient(180deg, rgba(13,17,23,0.55) 0%, rgba(13,17,23,0.78) 100%), url(${image})`,
      backgroundPosition: focal,
    }}
  >
    <div className={styles.inner}>
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      {title && <h1 className={styles.title}>{title}</h1>}
      <span className={styles.accent} aria-hidden="true" />
    </div>
  </header>
);

export default PageHero;
