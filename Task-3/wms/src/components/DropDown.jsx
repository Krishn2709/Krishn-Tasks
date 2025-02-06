import React, { useState } from "react";
import styles from "../styles/dropdown.module.scss";

const Dropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className={styles.dropdown}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find((opt) => opt.value === selectedValue)?.label || "Select"}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={styles.option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
