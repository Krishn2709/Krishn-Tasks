"use client";

import React, { useEffect } from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import styles from "../../../styles/addProduct.module.scss";
import { useRouter } from "next/navigation";
import DynamicForm from "../../../components/DynamicForm";
import modalConfig from "../../../data/addProd.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductMasterData } from "../../../redux/slices/addProdSlice";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductMasterData());
  }, []);

  const { productMasterData } = useSelector((state) => state.productMasterData);

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
          modalConfig={modalConfig}
          onClose={onClose}
          FieldData={productMasterData}
        />
      </div>
    </>
  );
}
