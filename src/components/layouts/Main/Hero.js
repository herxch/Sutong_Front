import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Professional, Precise, Personal.</h1>
          <p className={styles.heroSubtitle}>
            Tires are not just black and round anymore, sometimes managing them
            can be complicated, and that is what we are here for, to make
            everything simple and efficient. We are more than just a tire
            company.
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
