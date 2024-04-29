import styles from "./AboutUs.module.css";
import HQ from "../../../assets/pic/Hockley.jpg";

const AboutUs = () => {
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyHeader}>
        <h1 className={styles.storyTitle}>
          Sutong Tire Resource: Your Trusted Partner for Tires (Since 1993)
        </h1>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <h2 className={styles.storySubTitle}>
              A Legacy of Expertise in Meeting Specific Needs
            </h2>
            <p className={styles.storyParagraph}>
              Established in 1993, Sutong Tire Resource has built a reputation
              for exceptional service and a commitment to sourcing the perfect
              tires for each customer. Headquartered near Houston, Texas, we
              operate a vast distribution network across the US and Canada,
              encompassing over 650,000 square feet of warehousing and office
              space.
            </p>
          </div>
          <div className={styles.storyPhoto}>
            <img src={HQ} alt="Sutong HQ" className={styles.photoDisplay} />
          </div>
        </div>
      </div>
      <div className={styles.storyContent2}>
        <div className={styles.storyText}>
          <h2 className={styles.storySubTitle}>
            Empowering Your Business Across North America
          </h2>
          <p className={styles.storyParagraph}>
            Sutong is your one-stop shop for wholesale tires, catering to a
            diverse clientele including:
            <ul className={styles.storyUL}>
              <li>Utility and RV Trailer Industry</li>
              <li>Large National Retail Chains</li>
              <li>Independent Tire Retailers</li>
              <li>Wholesalers</li>
            </ul>
          </p>
        </div>
        <div className={styles.storyText}>
          <h2 className={styles.storySubTitle}>
            Competitive Advantage Through Global Sourcing
          </h2>
          <p className={styles.storyParagraph}>
            Our extensive global network allows us to import over 5 million
            tires annually, bypassing unnecessary middlemen. This translates to:
            <ul className={styles.storyUL}>
              <li>Exceptional Wholesale Pricing</li>
              <li>Increased Profit Margins for Your Business</li>
            </ul>
          </p>
        </div>
        <div className={styles.storyText}>
          <h2 className={styles.storySubTitle}>
            Beyond Wholesale: Your Strategic Partner
          </h2>
          <p className={styles.storyParagraph}>
            Sutong Tire Resource goes beyond simply being a supplier. We are
            your strategic partner, committed to your success.
          </p>
        </div>
        <div className={styles.storyText}>
          <h2 className={styles.storySubTitle}>Ready to Partner for Growth?</h2>
          <p className={styles.storyParagraph}>
            Contact us today and discover how Sutong's expertise and extensive
            network can unlock a world of opportunity for your business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
