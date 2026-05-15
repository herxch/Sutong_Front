import styles from "./Hero.module.css";

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.overlay} aria-hidden="true" />
    <div className={styles.inner}>
      <span className={styles.kicker}>SINCE 1993 · TIRE & WHEEL DISTRIBUTION</span>
      <h1 className={styles.title}>
        Professional.
        <br />
        Precise.
        <br />
        <span className={styles.titleAccent}>Personal.</span>
      </h1>
      <p className={styles.subtitle}>
        Tires are not just black and round anymore. We make managing them simple
        and efficient — more than just a tire company.
      </p>
      <span className={styles.accentBar} aria-hidden="true" />
    </div>
    <div className={styles.scrollHint} aria-hidden="true">
      <span>SCROLL</span>
      <span className={styles.scrollLine} />
    </div>
  </section>
);

export default Hero;
