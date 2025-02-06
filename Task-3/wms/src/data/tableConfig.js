const tableConfig = {
  fields: [
    {
      id: 1,
      name: "product_code",
      label: "Product Code",
    },
    {
      id: 2,
      name: "ws_code",
      label: "Wondersoft Code",
    },
    {
      id: 3,
      name: "product_name",
      label: "Product Name",
    },
    {
      id: 4,
      name: "manufacturer",
      label: "Manufacturer",
    },
    {
      id: 5,
      name: "combination",
      label: "Combination",
    },
    {
      id: 6,
      name: "publish_status",
      label: "Status",
      getClassName: (status) => {
        const classMap = {
          Published: "published",
          Unpublished: "unpublished",
          Draft: "draft",
        };
        return classMap[status] || "";
      },
    },
    {
      id: 7,
      name: "action",
      label: "Action",
      isCustom: true,
      render: (product, styles) => (
        <>
          <button
            className={styles.edit}
            onClick={() => console.log("Edit clicked for", product)}
          >
            <img
              src="https://stage.mkwms.dev/assets/table/Edit-button.svg"
              alt="Edit"
              width="24"
              height="24"
              className={styles.navSvg1}
            />
          </button>
          <button
            className={styles.copy}
            onClick={() => console.log("Copy clicked for", product)}
          >
            <img
              src="https://stage.mkwms.dev/assets/table/copy-button.svg"
              alt="Copy"
              width="24"
              height="24"
              className={styles.navSvg1}
            />
          </button>
        </>
      ),
    },
  ],
};

export default tableConfig;
