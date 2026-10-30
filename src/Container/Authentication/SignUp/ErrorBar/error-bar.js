import React from "react";
import styles from "./error.module.css";
// Fades in over 1s, as MUI's <Fade in timeout={1000}> did; the text keeps
// MUI's caption typography (0.75rem, block).
const ErrorBar = ({ errorText }) => {
  return (
    <div className={`${styles.error} ${styles.fadeIn}`}>
      {" "}
      <span className={styles.caption}>{errorText}</span>
    </div>
  );
};

export default ErrorBar;
