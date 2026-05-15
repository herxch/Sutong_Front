import styles from "./Jobs.module.css";
import Job from "./Job";
import { JOBS, HR_EMAIL } from "../../config/jobs";

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
          {job.body}
        </Job>
      ))
    )}
  </div>
);

export default Jobs;
