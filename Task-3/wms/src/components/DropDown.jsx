import React, { useState, useMemo } from "react";
import styles from "../styles/dropdown.module.scss";
import { SearchField } from "./SearchField";

const Dropdown = ({ options, selectedValue, onChange, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const showSearchBar =
    selectedOption?.label === "Manufacturer" ||
    selectedOption?.label === "Molecule";

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [options, searchText]);

  return (
    <div className={styles.dropdown} tabIndex={0}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.label || "Select"}
        <span className={styles.arrow}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-up"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          )}
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul className={styles.options}>
            {showSearchBar && (
              <li>
                <SearchField
                  onSearchChange={handleSearchChange}
                  placeholder="Search..."
                />
              </li>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={styles.option}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className={styles.noResults}>No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
