import React from "react";
import styles from "./Button.module.css"; // 导入CSS模块

const Button = ({ text, href }) => {
  return (
    <a
      href={href}
      className={styles.actionButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export default Button;
