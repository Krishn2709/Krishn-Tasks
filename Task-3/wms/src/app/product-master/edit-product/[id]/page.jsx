"use client";

import React, { useEffect, use } from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import DynamicForm from "../../../../components/DynamicForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductMasterData } from "../../../../redux/slices/prodMasterSlice";
import {
  fetchProductDetails,
  updateProductRequest,
} from "../../../../redux/slices/editProdSlice";
import styles from "../../../../styles/addProduct.module.scss";
import productModalConfig from "../../../../data/editProd";

export default function EditProductPage({ params }) {
  const unwrappedParams = use(params); // Unwrapping the params promise
  const { id } = unwrappedParams;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  const { productMasterData } = useSelector((state) => state.productMasterData);
  const { productData } = useSelector((state) => state.editProduct);

  const handleSave = async (formData) => {
    const transformedData = {
      ...formData,
      combination: {
        molecules:
          formData.combination?.molecules?.map((m) => m.molecule_id) || [],
      },
      sales_category: {
        ...formData.sales_category,
        b2c_category: formData.sales_category?.b2c_category?.id || null,
      },
    };

    delete transformedData.alternate_product;
    try {
      await dispatch(updateProductRequest({ id, data: transformedData }));
      router.push("/product-master");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const onClose = () => {
    router.push("/product-master");
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <Navigator />
        <DynamicForm
          onClose={onClose}
          FieldData={productMasterData}
          editProdData={productData}
          productModalConfig={productModalConfig}
          productMasterData={productMasterData}
          handleSave={handleSave}
        />
      </div>
    </>
  );
}
