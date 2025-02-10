"use client";

import React, { useEffect, use } from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import DynamicForm from "../../../../components/DynamicForm";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductMasterData } from "../../../../redux/slices/addProdSlice";
import {
  fetchProductDetails,
  updateProduct,
} from "../../../../redux/slices/editProdSlice";
import styles from "../../../../styles/addProduct.module.scss";
import productModalConfig from "../../../../data/addProd";

export default function EditProductPage({ params }) {
  const unwrappedParams = use(params); // Unwrapping the params promise
  const { id } = unwrappedParams;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(fetchProductDetails(id));
  }, []);

  const { productMasterData } = useSelector((state) => state.productMasterData);
  const { productData } = useSelector((state) => state.editProduct);

  // Fetch product details

  // Update product
  //   dispatch(updateProduct({ id: productId, data: updatedData }));
  const router = useRouter();
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
        />
      </div>
    </>
  );
}
