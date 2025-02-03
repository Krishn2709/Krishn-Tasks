import React from "react";
import styles from "../styles/product-master.module.scss";

const ProductList = ({ products }) => {
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
            <td>{product.publish_status}</td>
            <td>
              <button>Edit / </button>
              <button>Copy</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
