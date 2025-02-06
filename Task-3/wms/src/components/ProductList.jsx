"use client";

import styles from "../styles/product-master.module.scss";

const ProductList = ({ products, tableConfig }) => {
  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          {tableConfig.fields.map((field) => (
            <th key={field.id}>{field.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.product_id}>
            {tableConfig.fields.map((field) => {
              if (field.isCustom) {
                return <td key={field.id}>{field.render(product, styles)}</td>;
              }

              let className = "";
              if (field.name === "publish_status" && field.getClassName) {
                className =
                  styles[field.getClassName(product.publish_status)] || "";
              }

              return (
                <td key={field.id} className={className}>
                  {product[field.name] || "N/A"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
