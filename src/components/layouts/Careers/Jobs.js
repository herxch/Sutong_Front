import styles from "./Jobs.module.css";
import Job from "./Job";
import { JOBS, HR_EMAIL, APPLY_URL } from "../../config/jobs";

const Jobs = () => (
  <div className={styles.jobsContainer}>
    <h1 className={styles.jobsTitle}>Current Openings</h1>
    {JOBS.length === 0 ? (
      <p className={styles.noOpenings}>
        We currently have no positions available. Please check back regularly,
        as we frequently post new positions. In the meantime, you may send your
        resumé to{" "}
        <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a> and we'll keep it on file.
      </p>
    ) : (
      JOBS.map((job) => (
        <Job key={job.id} title={job.title}>
          <p className={styles.jobBody}>
            View the full description and apply on our{" "}
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.applyLink}
            >
              recruiting portal
            </a>
            .
          </p>
        </Job>
      ))
    )}
  </div>
);

export default Jobs;
