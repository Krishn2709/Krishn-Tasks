"use client";

import styles from "../styles/product-master.module.scss";

const ProductList = ({ products, tableConfig, handleOnClick }) => {
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
              //checks it he field is custom field
              if (field.isCustom && field.name === "action") {
                return (
                  <td key={field.id}>
                    {field.actions.map((action) => (
                      <button
                        key={action.fieldKey}
                        className={styles[action.fieldKey]}
                        onClick={() => handleOnClick(action.fieldKey, product)}
                      >
                        <img
                          src={action.imageURL}
                          alt={action.altText}
                          className={styles.navSvg1}
                        />
                      </button>
                    ))}
                  </td>
                );
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
