import React from "react";
import styles from "../styles/product-master.module.scss";

const ProductList = ({ products }) => {
  const getStatusClass = (status) => {
    if (status === "Published") {
      return styles.published;
    } else if (status === "Unpublished") {
      return styles.unpublished;
    } else if (status === "Draft") {
      return styles.draft;
    }
    return "";
  };

  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th>Product Code</th>
          <th>Wondersoft Code</th>
          <th>Product Name</th>
          <th>Manufacturer</th>
          <th>Combination</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_code}</td>
            <td>{product.ws_code}</td>
            <td>{product.product_name}</td>
            <td>{product.manufacturer}</td>
            <td>{product.combination}</td>
            <td>
              <span className={getStatusClass(product.publish_status)}>
                • {product.publish_status}
              </span>
            </td>
            <td className={styles.editCopy}>
              <button className={styles.edit}>
                <img
                  src="https://stage.mkwms.dev/assets/table/Edit-button.svg"
                  alt="Masters Icon"
                  width="24"
                  height="24"
                  className={styles.navSvg}
                />
              </button>
              <button className={styles.copy}>
                <img
                  src="https://stage.mkwms.dev/assets/table/copy-button.svg"
                  alt="Masters Icon"
                  width="24"
                  height="24"
                  className={styles.navSvg}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
