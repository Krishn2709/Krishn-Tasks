"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Modal.module.scss";
import { productModalConfig } from "../data/addProd";

const DynamicForm = ({ editProdData, onClose, FieldData }) => {
  console.log(editProdData);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData || {});
  const [productType, setProductType] = useState(
    productModalConfig.defaultProductType
  );
  const [activeTab, setActiveTab] = useState(
    productModalConfig.productTypes[productModalConfig.defaultProductType]
      .sections[2].default
  );

  const config = productModalConfig.productTypes[productType];

  useEffect(() => {
    if (editProdData) {
      setFormData(editProdData);
      if (editProdData["Product Type"]) {
        setProductType(editProdData["Product Type"]);
      }
    }
  }, [editProdData]);

  const handleChange = (e, field) => {
    const value = e.target.value;
    setFormData({ ...formData, [field.label]: value });

    if (field.label === "Product Type") {
      const newType = value;
      setProductType(newType);
      const newConfig = productModalConfig.productTypes[newType];
      setActiveTab(newConfig.sections[2].default);
    }
  };

  const getOptions = (field) => {
    if (Array.isArray(field.options)) return field.options;
    if (
      typeof field.options === "string" &&
      Array.isArray(FieldData[field.options])
    ) {
      return FieldData[field.options];
    }
    return [];
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h1>{config.sections[0].fields[0].label}</h1>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Basic Details */}
        <div className={styles.formGroup}>
          {config.sections[1].fields.map((field, index) => (
            <div key={index} className={styles.inputGroup}>
              <label>{field.label}</label>
              {field.type === "text" || field.type === "number" ? (
                <input
                  type={field.type}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  disabled={field.disabled}
                  required={field.required}
                  className={styles.inputField}
                  placeholder={field.label}
                />
              ) : field.type === "dropdown" ? (
                <select
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  required={field.required}
                  className={styles.inputField}
                >
                  <option value="">Select {field.label}</option>
                  {getOptions(field).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {config.sections[2].tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.formGroup}>
          {config.sections[3].fields[activeTab]?.map((field, index) => (
            <div key={index} className={styles.inputGroup}>
              <label>{field.label}</label>
              {field.type === "text" || field.type === "number" ? (
                <input
                  type={field.type}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  disabled={field.disabled}
                  required={field.required}
                  className={styles.inputField}
                  placeholder={field.label}
                />
              ) : field.type === "dropdown" ? (
                <select
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  disabled={field.disabled}
                  required={field.required}
                  className={styles.inputField}
                >
                  <option value="">Select {field.label}</option>
                  {getOptions(field).map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
