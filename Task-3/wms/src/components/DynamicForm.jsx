"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.scss";
import InputField from "./InputField";

const DynamicForm = ({
  productModalConfig,
  editProdData,
  onClose,
  productMasterData,
  handleSave,
  manufacturers,
  molecules,
  b2cProducts,
  errors,
  tabErrors,
}) => {
  const defaultType = productModalConfig?.defaultProductType || "Goods";
  const [formData, setFormData] = useState(editProdData || {});
  const [productType, setProductType] = useState(defaultType);
  const [activeTab, setActiveTab] = useState("");

  const config = productModalConfig?.productTypes?.[productType];

  useEffect(() => {
    if (config?.sections?.[2]?.default) {
      setActiveTab(config.sections[2].default);
    }
  }, [config]);

  useEffect(() => {
    if (editProdData) {
      setFormData(editProdData);
      if (editProdData["Product Type"]) {
        setProductType(editProdData["Product Type"]);
      }
    }
  }, [editProdData]);

  const handleInputChange = (e, field) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [field.key || field.label]: value,
    }));

    if (field.label === "Product Type") {
      const newType = value;
      setProductType(newType);

      const newConfig = productModalConfig?.productTypes?.[newType];
      if (newConfig?.sections?.[2]?.default) {
        setActiveTab(newConfig.sections[2].default);
      }
    }
  };

  const renderFields = (fields = []) => {
    return fields.map((field, index) => (
      <InputField
        key={`${field.label}-${index}`}
        label={field.label}
        type={field.type === "dropdown" ? "select" : field.type}
        name={field.key || field.label}
        required={field.required}
        placeholder={field.label}
        value={
          formData[field.key || field.label] ||
          (field.label === "Molecules" ? [] : "")
        }
        onChange={(e) => handleInputChange(e, field)}
        providedOptions={field.options}
        disabled={field.disabled}
        productMasterData={productMasterData}
        editProdData={editProdData}
        path={field.mapping}
        manufacturers={manufacturers}
        molecules={molecules}
        b2cProducts={b2cProducts}
        errors={errors}
      />
    ));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h1>{config?.sections[0]?.fields?.[0]?.label}</h1>
          <button className={styles.closeButton} onClick={onClose}>
            {config?.sections[0]?.fields?.[1]?.label}
          </button>
        </div>

        <div className={styles.formGroup}>
          {renderFields(config?.sections[1]?.fields)}
        </div>

        {config?.sections[2]?.tabs && (
          <div className={styles.tabs}>
            {config.sections[2].tabs.map((tab) => (
              <button
                key={tab}
                className={`${styles.tabButton} 
                  ${activeTab === tab ? styles.activeTab : ""} 
                  ${tabErrors?.[tab] ? styles.errorTab : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tabErrors?.[tab] && <span className={styles.errorDot}></span>}
              </button>
            ))}
          </div>
        )}

        <div className={styles.formGroup}>
          {renderFields(config?.sections[3]?.fields?.[activeTab])}
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.saveButton}
            onClick={() => handleSave(formData)}
          >
            {config?.sections[4]?.fields?.[0]?.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
