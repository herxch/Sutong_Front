import styles from "./Features.module.css";
import IconProfessional from "../../../assets/pic/Professional.svg";
import IconPrecise from "../../../assets/pic/Precise.svg";
import IconPersonal from "../../../assets/pic/Personal.svg";

const ITEMS = [
  {
    icon: IconProfessional,
    title: "Professional",
    description:
      "Sutong has over 40 years of experience in the tire industry, serving as a global resource integrator and supply chain expert, with a dedicated team providing 24-hour service worldwide.",
  },
  {
    icon: IconPrecise,
    title: "Precise",
    description:
      "Sutong ensures 90-day delivery for overseas shipments, 5-day delivery from distribution centers, and 24-hour outbound for online orders, maintaining a 98% fill rate for precise and efficient service.",
  },
  {
    icon: IconPersonal,
    title: "Personal",
    description:
      "Sutong customizes programs for each customer, treating them like family. We personalize all our services, deeply caring about our customers' success, because their success is our success.",
  },
];

const Features = () => (
  <section className={styles.features}>
    <header className={styles.featuresHeader}>
      <span className={styles.featuresKicker}>What Sets Us Apart</span>
      <h2 className={styles.featuresTitle}>Core Values</h2>
    </header>
    <div className={styles.featuresList}>
      {ITEMS.map((item) => (
        <article key={item.title} className={styles.featureItem}>
          <img
            src={item.icon}
            alt=""
            className={styles.featureIcon}
            loading="lazy"
            decoding="async"
          />
          <h3 className={styles.featureTitle}>{item.title}</h3>
          <p className={styles.featureDescription}>{item.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Features;
