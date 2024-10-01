import { useState } from "react";
import styles from "./Job.module.css";

const Job = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.jobPosting}>
      <div
        className={styles.jobHeader}
        onClick={toggleOpen} // 绑定点击事件到整个 jobHeader 区域
        style={{ cursor: "pointer" }} // 鼠标样式为点击手势
      >
        <h2 className={styles.jobsTitle}>{title}</h2>
        <button
          className={`${styles.toggleButton} ${
            isOpen ? styles.openButton : styles.closedButton
          }`}
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>
      <div className={`${styles.jobContent} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};
export default Job;
