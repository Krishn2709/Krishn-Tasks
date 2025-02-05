import React from "react";
import Navigator from "@/components/Navigator";
import Navbar from "@/components/Navbar";
import styles from "../../../styles/addProduct.module.scss";

function page() {
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <Navigator />
      </div>
    </>
  );
}

export default page;
