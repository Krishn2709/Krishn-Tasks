import React from "react";
import styles from "../styles/Modal.module.scss";

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
  let optionsArray = [];

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

      {type === "select" ? (
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
