import React from "react";
import styles from "../styles/spinner.module.scss";

const Spinner = ({ size = "medium", color = "#2d2d2d" }) => {
  return (
    <div className={styles.spinnerWrapper}>
      <div
        className={styles.spinner}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderColor: `${color} transparent ${color} transparent`,
        }}
      />
    </div>
  );
};

const sizeMap = {
  small: "24px",
  medium: "40px",
  large: "64px",
};

export default Spinner;
