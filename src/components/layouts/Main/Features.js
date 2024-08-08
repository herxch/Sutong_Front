// FeaturesSection.js

import React from "react";
import styles from "./Features.module.css"; // Ensure the path to your CSS module is correct
import IconProfessional from "../../../assets/pic/Professional.svg"; // Import your icons
import IconPrecise from "../../../assets/pic/Precise.svg";
import IconPersonal from "../../../assets/pic/Personal.svg";

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
            Sutong has over 40 years of experience in the tire industry, serving
            as a global resource integrator and supply chain expert, with a
            dedicated team providing 24-hour service worldwide.
          </p>
        </div>
        <div className={styles.featureItem}>
          <img src={IconPrecise} alt="Precise" className={styles.featureIcon} />
          <h2 className={styles.featureTitle}>PRECISE</h2>
          <p className={styles.featureDescription}>
            Sutong ensures 90-day delivery for overseas shipments, 5-day
            delivery from distribution centers, and 24-hour outbound for online
            orders, maintaining a 98% fill rate for precise and efficient
            service.
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
            Sutong customizes programs for each customer, treating them like
            family. We personalize all our services, deeply caring about our
            customers' success, because their success is our success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
