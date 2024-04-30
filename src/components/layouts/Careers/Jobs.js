import styles from "./Jobs.module.css";

const Jobs = () => {
  return (
    <div className={styles.jobsContainer}>
      <h1 className={styles.jobsTitle}>Current Openings</h1>
      <p className={styles.jobsParagraph}>
        We currently have no positions available. Please check back regularly,
        as we frequently post new positions. In the meantime, you can also send
        your resumé, which we'll keep on file.
      </p>
    </div>
  );
};

export default Jobs;
