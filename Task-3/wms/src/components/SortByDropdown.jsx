import styles from "../styles/search-filter-sort.module.scss";
import React, { useState, useRef, useEffect } from "react";

const SortByDropdown = ({ sorting, onSortChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "product_code", label: "Product Code" },
    { value: "ws_code", label: "Wondersoft Code" },
    { value: "name", label: "Product Name" },
    { value: "created", label: "Created at" },
    { value: "modified", label: "Updated at" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortClick = (direction) => {
    if (selectedField) {
      onSortChange({ field: selectedField, direction });
      setShowDropdown(false);
    }
  };

  const handleFieldSelect = (field) => {
    setSelectedField(field);
  };

  return (
    <div className={styles.sortContainer} ref={dropdownRef}>
      <button
        className={styles.sortButton}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src="https://stage.mkwms.dev/assets/table/sortIcon.svg"
          alt="Masters Icon"
          width="20"
          height="20"
          className={styles.navSvg}
        />
        Sort By
      </button>
      {showDropdown && (
        <div className={styles.sortDropdown}>
          {sortOptions.map((option) => (
            <div key={option.value}>
              <label key={option.value} className={styles.sortOption}>
                <input
                  type="checkbox"
                  checked={selectedField === option.value}
                  onChange={() => handleFieldSelect(option.value)}
                />
                {option.label}
              </label>
            </div>
          ))}

          <div className={styles.sortDirections}>
            <div className={styles.upDownButtons}>
              <button
                className={styles.directionButton}
                disabled={!selectedField}
                onClick={() => handleSortClick("a")}
              >
                ↑ Ascending
              </button>
              <button
                className={styles.directionButton}
                disabled={!selectedField}
                onClick={() => handleSortClick("d")}
              >
                ↓ Descending
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SortByDropdown };
