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
            Dedicated Account Management: You'll have a dedicated account
            manager as your point of contact. This ensures seamless
            communication, efficient order processing, and personalized support
            to address your specific business needs.
          </p>
        </div>
        <div className={styles.featureItem}>
          <img src={IconPrecise} alt="Precise" className={styles.featureIcon} />
          <h2 className={styles.featureTitle}>PRECISE</h2>
          <p className={styles.featureDescription}>
            Unmatched Inventory Depth: We source a vast catalog of tires, tubes,
            and wheels from leading global manufacturers. This extensive
            selection ensures you have the right products to meet your
            customers' diverse needs, from passenger car tires to heavy-duty
            truck options.
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
            Sutong Tire Resource goes beyond just being a supplier. We're your
            strategic partner in optimizing your inventory and maximizing your
            profitability. Contact us today to discuss your wholesale needs and
            unlock a world of growth opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
