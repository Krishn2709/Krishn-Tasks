"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/Modal.module.scss";
// import { closeModal } from "@/redux/slices/modalSlice";

const DynamicProductModal = ({ modalConfig, initialData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialData || {});
  const [activeTab, setActiveTab] = useState(
    modalConfig?.sections[2]?.default || ""
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field.label]: e.target.value });
  };

  // const handleSubmit = () => {
  //   console.log("Submitting data:", formData);
  //   dispatch(closeModal());
  // };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2>{modalConfig?.sections[0]?.fields[0]?.label || "Modal Title"}</h2>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(closeModal())}
          >
            ✕
          </button>
        </div>

        {/* Basic Details */}
        <div className={styles.formGroup}>
          {modalConfig?.sections[1]?.fields.map((field, index) => (
            <div key={index} className={styles.inputGroup}>
              <label>{field.label}</label>
              {field.type === "text" || field.type === "number" ? (
                <input
                  type={field.type}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  disabled={field.disabled}
                  className={styles.inputField}
                />
              ) : field.type === "dropdown" ? (
                <select
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  className={styles.inputField}
                >
                  {Array.isArray(field.options) ? (
                    field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </select>
              ) : null}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {modalConfig?.sections[2]?.tabs?.map((tab) => (
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
          {modalConfig?.sections[3]?.fields[activeTab]?.map((field, index) => (
            <div key={index} className={styles.inputGroup}>
              <label>{field.label}</label>
              {field.type === "text" || field.type === "number" ? (
                <input
                  type={field.type}
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  disabled={field.disabled}
                  className={styles.inputField}
                />
              ) : field.type === "dropdown" ? (
                <select
                  value={formData[field.label] || ""}
                  onChange={(e) => handleChange(e, field)}
                  className={styles.inputField}
                >
                  {Array.isArray(field.options) ? (
                    field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </select>
              ) : null}
            </div>
          ))}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.saveButton} /* onClick={handleSubmit} */>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductModal;
