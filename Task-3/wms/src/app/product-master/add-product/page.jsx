import React from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import styles from "../../../styles/addProduct.module.scss";

import Modal from "../../../components/Modal";
import modalConfig from "../../../data/addProd.json";

function page() {
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <Navigator />
        <Modal modalConfig={modalConfig} />
      </div>
    </>
  );
}

export default page;
