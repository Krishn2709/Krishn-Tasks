"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "@/components/Navbar";
import Navigator from "@/components/Navigator";
import DynamicForm from "../../../components/DynamicForm";
import styles from "../../../styles/addProduct.module.scss";
import productModalConfig from "../../../data/addProd.js";
import {
  fetchProductMasterData,
  searchManufacturers,
  searchMolecules,
} from "../../../redux/slices/prodMasterSlice";
import {
  postProductRequest,
  fetchB2CProducts,
} from "../../../redux/slices/addProdSlice";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(searchManufacturers());
    dispatch(searchMolecules());
    dispatch(fetchB2CProducts());
  }, [dispatch]);

  const { manufacturers, molecules, productMasterData, b2cProducts } =
    useSelector((state) => ({
      manufacturers: state.products.manufacturers,
      molecules: state.products.molecules,
      productMasterData: state.productMasterData.productMasterData,
      b2cProducts: state.addProduct.b2cProducts,
    }));

  const onClose = () => router.push("/product-master");

  const validateForm = (data) => {
    const errors = {};
    const productType = data.product_type || "Goods";
    const sections =
      productModalConfig.productTypes[productType]?.sections || [];

    sections.forEach(({ fields }) => {
      if (!fields) return;

      const checkFields = (field) => {
        if (field.required && !data[field.key]) {
          errors[field.key] = "required*";
        }
      };

      if (Array.isArray(fields)) {
        fields.forEach(checkFields);
      } else {
        Object.values(fields).flat().forEach(checkFields);
      }
    });

    return errors;
  };

  const tabErrors = useMemo(() => {
    if (!errors) return {};
    const productType = formData.product_type || "Goods";
    const sections =
      productModalConfig.productTypes[productType]?.sections || [];
    const dynamicSectionFields = sections[3]?.fields || {};

    return Object.keys(dynamicSectionFields).reduce((acc, tabName) => {
      if (dynamicSectionFields[tabName]?.some((field) => errors[field.key])) {
        acc[tabName] = true;
      }
      return acc;
    }, {});
  }, [errors, formData.product_type]);

  const transformFormData = (formData) => {
    const findByName = (list, name) => list.find((item) => item.name === name);

    return {
      product_type: formData.product_type,
      product_name: formData.product_name,
      is_active: formData.is_active === "Yes",
      transaction_units: {
        purchase_unit: Number(formData.purchase_unit) || 1,
        sales_unit: Number(formData.sales_unit) || 1,
        transfer_unit: Number(formData.transfer_unit) || 1,
      },
      packaging_units: {
        dosage_form: formData.dosage_form,
        package_type: formData.package_type,
        uom: formData.uom,
        package_size: formData.package_size,
      },
      combination: {
        molecules: [findByName(molecules, formData.combination)?.id].filter(
          Boolean
        ),
      },
      is_discontinued: false,
      is_refrigerated: false,
      can_sell_online: true,
      is_chronic: true,
      is_rx_required: true,
      is_assured: formData.is_assured === "Yes",
      is_banned: formData.is_banned === "Yes",
      is_hidden_from_alternate_products:
        formData.is_hidden_from_alternate_products === "Yes",
      taxes: {
        gst_type: formData.gst_type,
        hsn_code: formData.hsn_code,
      },
      sales_category: {
        b2b_category: formData.b2b_category,
        b2c_category: findByName(b2cProducts, formData.b2c_category)?.id,
        sales_trend_category: formData.sales_trend_category,
        return_type: formData.product_return_type,
        purchase: 90,
        purchase_return: -60,
        transfer_out: 60,
        transfer_in: -120,
        franchise_out: 90,
        franchise_in: 0,
        b2c_out: 120,
        b2c_in: 0,
      },
      manufacturer: findByName(manufacturers, formData.manufacturer) || {},
      mis_reporting_category: formData.mis_reporting_category,
      mis_warehouse_category: formData.mis_warehouse_category,
      mrp: formData.mrp,
    };
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    setErrors((prevErrors) =>
      Object.keys(newFormData).reduce((acc, key) => {
        if (!newFormData[key]) acc[key] = prevErrors[key];
        return acc;
      }, {})
    );
  };

  const handleSave = async (formData) => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const transformedData = transformFormData(formData);
      await dispatch(postProductRequest(transformedData));
      router.push("/product-master");
    } catch (error) {
      console.error("Error saving product:", error);
      setErrors({ submit: "Failed to save product. Please try again." });
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <Navigator />
        <DynamicForm
          productModalConfig={productModalConfig}
          onClose={onClose}
          productMasterData={productMasterData}
          manufacturers={manufacturers}
          molecules={molecules}
          handleSave={handleSave}
          errors={errors}
          b2cProducts={b2cProducts}
          onFormChange={handleFormChange}
          tabErrors={tabErrors}
        />
      </div>
    </>
  );
}
