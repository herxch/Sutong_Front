import styles from "./CareersNotices.module.css";
import { HR_EMAIL } from "../../config/jobs";

/**
 * The three notices a careers page has to carry.
 *
 * The equal-opportunity text is taken verbatim from section 2.3 of the Employee
 * Handbook rather than reworded — the handbook is the governing document, and a
 * paraphrase here would be a second version of a policy that is supposed to have
 * one.
 *
 * The privacy paragraph describes what the system actually does with an
 * application. HR's formal privacy notice replaces it when it is written.
 */
const CareersNotices = () => (
  <section className={styles.notices} aria-label="Applicant notices">
    <div className={styles.inner}>
      <h2 className={styles.heading}>Equal Opportunity Statement</h2>
      <p className={styles.body}>
        Sutong Tire Resources is committed to the principles of equal employment.
        We are committed to complying with all federal, state, and local laws
        providing equal employment opportunities, and all other employment laws
        and regulations. It is our intent to maintain a work environment that is
        free of harassment, discrimination, or retaliation because of age, race,
        religion, color, national origin, ancestry, gender, sex, sexual
        orientation (including transgender status, gender identity or
        expression), pregnancy (including childbirth, lactation, and related
        medical conditions), physical or mental disability, genetic information,
        marital status, AIDS/HIV status, military service, veteran status,
        uniformed servicemember status, or any other status protected by federal,
        state, or local laws.
      </p>

      <h2 className={styles.heading}>Requesting an accommodation</h2>
      <p className={styles.body}>
        If you need an accommodation to complete an application or take part in
        an interview, email{" "}
        <a className={styles.link} href={`mailto:${HR_EMAIL}`}>
          {HR_EMAIL}
        </a>{" "}
        and tell us what would help. You do not need to give a medical reason,
        and asking will not affect how your application is considered.
      </p>

      <h2 className={styles.heading}>What we do with your information</h2>
      <p className={styles.body}>
        What you send goes to our own recruiting system and is used to consider
        you for the role you applied for, and — if you are a good match — for
        other openings. Your resume is stored encrypted. Voluntary
        self-identification, if you choose to give it, is kept separate and is
        not shown to the people deciding on your application. We do not sell your
        information or share it with anyone outside the company for their own
        use. Questions about your application or your information:{" "}
        <a className={styles.link} href={`mailto:${HR_EMAIL}`}>
          {HR_EMAIL}
        </a>
        .
      </p>
    </div>
  </section>
);

export default CareersNotices;
