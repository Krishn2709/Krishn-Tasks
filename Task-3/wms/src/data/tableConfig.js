const tableConfig = {
  fields: [
    {
      id: 1,
      name: "product_code",
      label: "Product Code",
      width: "60",
    },
    {
      id: 2,
      name: "ws_code",
      label: "Wondersoft Code",
      width: "60",
    },
    {
      id: 3,
      name: "product_name",
      label: "Product Name",
      width: "80",
    },
    {
      id: 4,
      name: "manufacturer",
      label: "Manufacturer",
      width: "110",
    },
    {
      id: 5,
      name: "combination",
      label: "Combination",
      width: "110",
    },
    {
      id: 6,
      name: "publish_status",
      label: "Status",
      width: "60",
      getClassName: (status) => {
        const classMap = {
          Published: "published",
          Unpublished: "unpublished",
          Draft: "draft",
        };
        return classMap[status] || "";
      },
      render: (status) => (
        <span className={classMap[status] || ""}>{status}</span>
      ),
    },
    {
      id: 7,
      name: "action",
      label: "",
      isCustom: true,
      width: "0",
      actions: [
        {
          fieldKey: "edit",
          fieldType: "button",
          imageURL: "https://stage.mkwms.dev/assets/table/Edit-button.svg",
          altText: "Edit",
        },
        {
          fieldKey: "copy",
          fieldType: "button",
          imageURL: "https://stage.mkwms.dev/assets/table/copy-button.svg",
          altText: "Copy",
        },
      ],
    },
  ],
};

export default tableConfig;
