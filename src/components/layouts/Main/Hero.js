import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            OUR CUSTOMERS' SUCCESS IS OUR SUCCESS
          </h1>
          <p className={styles.heroSubtitle}>
            We supply high-quality tires with excellent service
          </p>
        </div>
      </div>
    </div>
  );
};
export default Hero;

// const Hero = () => {
//     return (
//         <></>
//     )}
// export default Hero
