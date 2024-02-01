// FeaturesSection.js

import React from "react";
import styles from "./Features.module.css"; // Ensure the path to your CSS module is correct
import IconProfessional from "../../assets/pic/Professional.svg"; // Import your icons
import IconPrecise from "../../assets/pic/Precise.svg";
import IconPersonal from "../../assets/pic/Personal.svg";

const Features = () => {
  return (
    <div className={styles.features}>
      <h1 className={styles.featuresTitle}>CORE VALUES</h1>
      <div className={styles.featuresList}>
        <div className={styles.featureItem}>
          <img
            src={IconProfessional}
            alt="Professional"
            className={styles.featureIcon}
          />
          <h2 className={styles.featureTitle}>PROFESSIONAL</h2>
          <p className={styles.featureDescription}>
            Isende ferortu ratime egli vis; elut perferdam pollitburum
            mantebatum demno nos verem seronimadum viserfectam omaciectam.
          </p>
        </div>
        <div className={styles.featureItem}>
          <img src={IconPrecise} alt="Precise" className={styles.featureIcon} />
          <h2 className={styles.featureTitle}>PRECISE</h2>
          <p className={styles.featureDescription}>
            Isende ferortu ratime egli vis; elut perferdam pollitburum
            mantebatum demno nos verem seronimadum viserfectam omaciectam.
          </p>
        </div>
        <div className={styles.featureItem}>
          <img
            src={IconPersonal}
            alt="Personal"
            className={styles.featureIcon}
          />
          <h2 className={styles.featureTitle}>PERSONAL</h2>
          <p className={styles.featureDescription}>
            Isende ferortu ratime egli vis; elut perferdam pollitburum
            mantebatum demno nos verem seronimadum viserfectam omaciectam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
