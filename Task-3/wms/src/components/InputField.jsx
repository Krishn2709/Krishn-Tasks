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
}) => {
  const optionsArray = Array.isArray(providedOptions)
    ? providedOptions
    : productMasterData?.[providedOptions] || [];
  console.log(manufacturers);
  console.log(molecules);

  const fieldValue = path ? getValueByPath(editProdData, path) : value;

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
      <label className="text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "select" ? (
        <select
          className={styles.inputField}
          name={name}
          value={fieldValue || ""}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          <option value="">Select {label}</option>
          {optionsArray.map((option, index) => {
            const optionValue =
              typeof option === "object" ? option.value : option;
            const optionDisplay =
              typeof option === "object"
                ? optionLabel
                  ? option[optionLabel]
                  : option.label
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
          className={styles.inputField}
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={fieldValue || ""}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};
export default InputField;
