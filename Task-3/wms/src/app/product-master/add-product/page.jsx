"use client";

import React, { useEffect } from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import styles from "../../../styles/addProduct.module.scss";
import { useRouter } from "next/navigation";
import DynamicForm from "../../../components/DynamicForm";
import productModalConfig from "../../../data/addProd.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductMasterData } from "../../../redux/slices/addProdSlice";
import {
  searchManufacturers,
  searchMolecules,
} from "../../../redux/slices/productSlice";

export default function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(searchManufacturers());
    dispatch(searchMolecules());
  }, []);
  const { manufacturers, molecules } = useSelector((state) => state.products);
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
          productModalConfig={productModalConfig}
          onClose={onClose}
          productMasterData={productMasterData}
          manufacturers={manufacturers}
          molecules={molecules}
        />
      </div>
    </>
  );
}
