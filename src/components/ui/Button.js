import React from "react";
import styles from "./Button.module.css"; // 导入CSS模块

const Button = ({ text, href, newWindow = true, onClick }) => {
  const handleClick = (event) => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const target = newWindow ? "_blank" : "_self";
  const rel = newWindow ? "noopener noreferrer" : undefined;

  return (
    <a
      href={href}
      className={styles.actionButton}
      target={target}
      rel={rel}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export default Button;
