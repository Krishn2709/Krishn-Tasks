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
import {
  searchManufacturers,
  searchMolecules,
  fetchProductsRequest,
} from "@/redux/slices/productSlice";
import { fetchB2CProducts } from "../../../../redux/slices/addProdSlice";

export default function EditProductPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProductMasterData());
    dispatch(searchManufacturers());
    dispatch(searchMolecules());
    dispatch(fetchB2CProducts());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, []);

  const { productMasterData } = useSelector((state) => state.productMasterData);
  const { productData } = useSelector((state) => state.editProduct);
  const { manufacturers, molecules } = useSelector((state) => state.products);
  const { b2cProducts } = useSelector((state) => state.addProduct);

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
      packaging_units: {
        ...formData.packaging_units,
        package_size: Number(formData.package_size) || 0,
      },
    };

    delete transformedData.alternate_product;
    try {
      await dispatch(updateProductRequest({ id, data: transformedData }));
      dispatch(fetchProductsRequest());
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
          manufacturers={manufacturers}
          molecules={molecules}
          b2cProducts={b2cProducts}
        />
      </div>
    </>
  );
}
