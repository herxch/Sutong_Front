import { useState } from "react";
import styles from "./Job.module.css";

const Job = ({ title, subtitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Children stay unmounted until the first open, then stay mounted. Each one
  // fetches its own description, and pulling every description for roles nobody
  // expanded would be a request per posting on page load. Keeping it mounted
  // afterwards means reopening is instant and the grid-row transition still runs.
  const [hasOpened, setHasOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpen((open) => !open);
    setHasOpened(true);
  };

  const contentId = `job-content-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={styles.jobPosting}>
      <button
        type="button"
        className={styles.jobHeader}
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={styles.jobHeading}>
          <h2 className={styles.jobsTitle}>{title}</h2>
          {subtitle && <span className={styles.jobMeta}>{subtitle}</span>}
        </span>
        <span
          aria-hidden="true"
          className={`${styles.toggleButton} ${
            isOpen ? styles.openButton : styles.closedButton
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div id={contentId} className={styles.jobContent} data-open={isOpen}>
        <div className={styles.jobContentInner}>{hasOpened ? children : null}</div>
      </div>
    </div>
  );
};
export default Job;
