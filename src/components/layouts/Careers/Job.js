import { useState } from "react";
import styles from "./Job.module.css";

const Job = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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
        <h2 className={styles.jobsTitle}>{title}</h2>
        <span
          aria-hidden="true"
          className={`${styles.toggleButton} ${
            isOpen ? styles.openButton : styles.closedButton
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        id={contentId}
        className={styles.jobContent}
        data-open={isOpen}
      >
        <div className={styles.jobContentInner}>{children}</div>
      </div>
    </div>
  );
};
export default Job;
