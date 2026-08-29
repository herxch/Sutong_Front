import styles from "./Jobs.module.css";
import Job from "./Job";
import JobDetail from "./JobDetail";
import useJobs from "../../hooks/useJobs";
import {
  HR_EMAIL,
  EMPLOYMENT_TYPE_LABELS,
  COUNTRY_LABELS,
} from "../../config/jobs";

const meta = (job) =>
  [
    job.department,
    job.location && job.location.name,
    COUNTRY_LABELS[job.country] || job.country,
    EMPLOYMENT_TYPE_LABELS[job.employmentType] || job.employmentType,
    job.payRange,
  ]
    .filter(Boolean)
    .join(" · ");

const Jobs = () => {
  const { jobs, status, reload } = useJobs();

  return (
    <div className={styles.jobsContainer}>
      <h1 className={styles.jobsTitle}>Current Openings</h1>

      {status === "loading" && (
        <p className={styles.noOpenings}>Loading our current openings…</p>
      )}

      {/* "We could not reach the system" must not read as "we are not hiring". */}
      {status === "error" && (
        <p className={styles.noOpenings}>
          We could not load our openings just now.{" "}
          <button type="button" className={styles.retry} onClick={reload}>
            Try again
          </button>
          , or send your resumé to{" "}
          <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a> and we will come back to
          you.
        </p>
      )}

      {status === "ready" && jobs.length === 0 && (
        <p className={styles.noOpenings}>
          We currently have no positions available. Please check back regularly,
          as we frequently post new positions. In the meantime, you may send your
          resumé to <a href={`mailto:${HR_EMAIL}`}>{HR_EMAIL}</a> and we'll keep
          it on file.
        </p>
      )}

      {status === "ready" &&
        jobs.map((job) => (
          <Job key={job.slug} title={job.title} subtitle={meta(job)}>
            <JobDetail slug={job.slug} />
          </Job>
        ))}
    </div>
  );
};

export default Jobs;
