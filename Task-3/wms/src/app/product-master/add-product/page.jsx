"use client";

import React, { useEffect, useState } from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import styles from "../../../styles/addProduct.module.scss";
import { useRouter } from "next/navigation";
import DynamicForm from "../../../components/DynamicForm";
import productModalConfig from "../../../data/addProd.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductMasterData } from "../../../redux/slices/prodMasterSlice";
import {
  searchManufacturers,
  searchMolecules,
} from "../../../redux/slices/productSlice";
import {
  postProductRequest,
  fetchB2CProducts,
} from "../../../redux/slices/addProdSlice";

export default function Page() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(searchManufacturers());
    dispatch(searchMolecules());
    dispatch(fetchB2CProducts());
  }, [dispatch]);

  const { manufacturers, molecules } = useSelector((state) => state.products);
  const { productMasterData } = useSelector((state) => state.productMasterData);
  const { b2cProducts } = useSelector((state) => state.addProduct);

  const router = useRouter();
  const onClose = () => {
    router.push("/product-master");
  };

  const transformFormData = (formData) => {
    const selectedb2cCategory = b2cProducts.find(
      (b) => b.category_name === formData.b2c_category
    );
    const selectedManufacturer = manufacturers.find(
      (m) => m.name === formData.manufacturer
    );
    const selectedCombination = molecules.find(
      (c) => c.name === formData.combination
    );
    const transformedData = {
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
        molecules: Array.isArray(formData.combination)
          ? [selectedCombination.id]
          : [selectedCombination.id],
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
        b2c_category: Number(formData.b2c_category) || undefined,
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
        b2c_category: selectedb2cCategory.id,
      },

      manufacturer: {
        id: selectedManufacturer.id,
        name: selectedManufacturer.name,
      },

      mis_reporting_category: formData.mis_reporting_category,
      mis_warehouse_category: formData.mis_warehouse_category,

      mrp: formData.mrp,
    };

    return JSON.parse(JSON.stringify(transformedData));
  };

  async function handleSave(formData) {
    const errors = {};
    const productType = formData.product_type || "Goods";
    const sections =
      productModalConfig.productTypes[productType]?.sections || [];

    sections.forEach((section) => {
      if (Array.isArray(section.fields)) {
        section.fields.forEach((field) => {
          if (field.required && !formData[field.key]) {
            errors[field.key] = "This field is required";
          }
        });
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation Errors:", errors);
      return;
    }

    const transformedData = transformFormData(formData);
    try {
      await dispatch(postProductRequest(transformedData));
      router.push("/product-master");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

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
        />
      </div>
    </>
  );
}
