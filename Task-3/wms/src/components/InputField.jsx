import React, { useState } from "react";
import styles from "../styles/Modal.module.scss";
import { SearchSpecial } from "./SearchSpecial";

const getValueByPath = (obj, path) => {
  return path?.split(".").reduce((acc, key) => acc?.[key], obj);
};

const InputField = ({
  label,
  type,
  name,
  required,
  placeholder,
  optionLabel,
  onChange,
  value,
  providedOptions,
  disabled = false,
  productMasterData,
  editProdData,
  path,
  manufacturers,
  molecules,
  b2cProducts,
  errors,
}) => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  let optionsArray = [];
  console.log(manufacturers);

  if (label === "Manufacturer") {
    optionsArray = manufacturers || [];
  } else if (label === "Molecules") {
    optionsArray = molecules || [];
  } else if (label === "B2C Product Type") {
    optionsArray = b2cProducts || [];
  } else {
    optionsArray = Array.isArray(providedOptions)
      ? providedOptions
      : productMasterData?.[providedOptions] || [];
  }

  const fieldValue = path
    ? getValueByPath(editProdData, path) ?? ""
    : value ?? "";

  const fieldKey = name || label;
  const hasError = errors && errors[fieldKey];

  const isSearchableDropdown =
    label === "Manufacturer" ||
    label === "Molecules" ||
    label === "B2C Product Type";

  const filteredOptions = optionsArray.filter((option) => {
    const optionName =
      label === "B2C Product Type"
        ? option.category_name
        : typeof option === "object"
        ? option.name
        : option;
    return optionName?.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    setShowDropdown(true);
  };

  const handleOptionSelect = (selectedOption) => {
    const selectedValue =
      label === "B2C Product Type"
        ? selectedOption.category_name
        : typeof selectedOption === "object"
        ? selectedOption.name
        : selectedOption;

    onChange({ target: { name, value: selectedValue } });
    setSearchText(selectedValue);
    setShowDropdown(false);
  };

  if (type === "title") {
    return <h2 className="text-xl font-semibold mb-4">{label}</h2>;
  }

  if (type === "button") {
    return (
      <button
        type={name === "submit" ? "submit" : "button"}
        className={styles.saveButton}
        disabled={disabled}
        onClick={onChange}
      >
        {label}
      </button>
    );
  }

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label className="text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      {isSearchableDropdown ? (
        <div className={styles.searchDropdown}>
          <input
            type="text"
            className={`${styles.inputField} ${
              errors && errors[name] ? styles.errorInput : ""
            }`}
            placeholder={`Search ${label}...`}
            value={searchText}
            onChange={handleSearchChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />

          {showDropdown && filteredOptions.length > 0 && (
            <ul className={styles.dropdownList}>
              {filteredOptions.map((option, index) => (
                <li
                  key={`${name}-${index}`}
                  className={styles.dropdownItem}
                  onClick={() => handleOptionSelect(option)}
                >
                  {label === "B2C Product Type"
                    ? option.category_name
                    : option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : type === "select" ? (
        <select
          className={`${styles.inputField} ${
            hasError ? styles.errorInput : ""
          }`}
          name={name}
          defaultValue={fieldValue}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          <option value="">Select {label}</option>
          {optionsArray.map((option, index) => {
            const optionValue =
              typeof option === "object" ? option.name : option;
            const optionDisplay =
              label === "B2C Product Type"
                ? option.category_name
                : typeof option === "object"
                ? optionLabel
                  ? option[optionLabel]
                  : option.name
                : option;

            return (
              <option key={`${name}-${index}`} value={optionValue}>
                {optionDisplay}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          className={`${styles.inputField} ${
            hasError ? styles.errorInput : ""
          }`}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={fieldValue}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {hasError && (
        <span className={styles.errorMessage}>{errors[fieldKey]}</span>
      )}
    </div>
  );
};

export default InputField;
