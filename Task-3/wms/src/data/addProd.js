const commonSections = {
  header: {
    title: "Header",
    fields: [
      { type: "title", label: "Add Product" },
      { type: "button", label: "✕" },
    ],
  },
  basicDetails: {
    title: "Basic Details",
    commonFields: [
      {
        type: "text",
        label: "Product Name",
        required: true,
        key: "product_name",
        mapping: "product_name",
      },
      {
        type: "dropdown",
        label: "Product Type",
        options: ["Goods", "Services"],
        required: true,
        key: "product_type",
        mapping: "product_type",
      },
      {
        type: "text",
        label: "Wondersoft Code",
        disabled: true,
        key: "ws_code",
        mapping: "ws_code",
      },
      {
        type: "text",
        label: "Product Code",
        disabled: true,
        key: "product_code",
        mapping: "product_code",
      },
    ],
  },
  footer: {
    title: "Footer",
    fields: [{ type: "button", label: "Save", action: "submit" }],
  },
};

const goodsSpecificFields = [
  {
    type: "dropdown",
    label: "Manufacturer",
    options: [],
    required: true,
    key: "manufacturer",
    mapping: "manufacturer.name",
  },
  {
    type: "number",
    label: "MRP",
    required: true,
    key: "mrp",
    mapping: "mrp",
  },
];

const tabConfigs = {
  Goods: {
    tabs: [
      "Packaging & Units*",
      "Molecule Composition*",
      "Classification",
      "Transaction Units",
      "GST Info*",
      "Sales Category*",
      "MIS Category*",
    ],
    default: "Packaging & Units*",
  },
  Services: {
    tabs: ["Classification", "GST Info*", "MIS Category*"],
    default: "Classification",
  },
};

const dynamicSectionFields = {
  "Packaging & Units*": [
    {
      type: "dropdown",
      label: "Dosage Form",
      options: "dosage_form",
      required: true,
      key: "dosage_form",
      mapping: "packaging_units.dosage_form",
    },
    {
      type: "dropdown",
      label: "Package Type",
      options: "package_type",
      required: true,
      key: "package_type",
      mapping: "packaging_units.package_type",
    },
    {
      type: "dropdown",
      label: "UOM",
      options: "uom",
      required: true,
      key: "uom",
      mapping: "packaging_units.uom",
    },
    {
      type: "number",
      label: "Package Size",
      key: "package_size",
      mapping: "packaging_units.package_size",
    },
  ],
  "Molecule Composition*": [
    {
      type: "dropdown",
      label: "Molecules",
      options: "API_ENDPOINT_FOR_MOLECULES",
      required: true,
      key: "combination",
      mapping: "molecules[0].molecule_name",
    },
  ],
  Classification: {
    common: [
      {
        type: "dropdown",
        label: "Is Assured",
        options: ["Yes", "No"],
        required: true,
        key: "is_assured",
        mapping: "is_assured",
      },
    ],
    Goods: [
      {
        type: "dropdown",
        label: "Discontinued",
        disabled: true,
        key: "is_discontinued",
        mapping: "is_discontinued",
      },
      {
        type: "dropdown",
        label: "Banned",
        options: ["Yes", "No"],
        required: true,
        key: "is_banned",
        mapping: "is_banned",
      },
      {
        type: "dropdown",
        label: "Is Active",
        options: ["Yes", "No"],
        required: true,
        key: "is_active",
        mapping: "is_active",
      },
      {
        type: "dropdown",
        label: "Is Hidden From Alternate",
        options: ["Yes", "No"],
        key: "is_hidden_from_alternate_products",
        mapping: "alternate_product",
      },
      {
        type: "text",
        label: "Rx Required",
        disabled: true,
        key: "is_rx_required",
        mapping: "is_rx_required",
      },
      {
        type: "text",
        label: "Can Sell Online",
        disabled: true,
        key: "can_sell_online",
        mapping: "is_rx_required",
      },
      {
        type: "text",
        label: "Chronic",
        disabled: true,
        key: "is_chronic",
        mapping: "is_chronic",
      },
      {
        type: "text",
        label: "Refrigerated",
        disabled: true,
        key: "is_refrigerated",
        mapping: "is_refrigerated",
      },
      {
        type: "text",
        label: "Scheduled Type Code",
        options: "schedule_type_code",
        disabled: true,
        key: "schedule_type_code",
        mapping: "schedule_type_code",
      },
    ],
  },
  "Transaction Units": [
    {
      type: "number",
      label: "Purchase Unit",
      key: "purchase_unit",
      mapping: "transaction_units.purchase_unit",
    },
    {
      type: "number",
      label: "Transfer Unit",
      key: "transfer_unit",
      mapping: "transaction_units.transfer_unit",
    },
    {
      type: "number",
      label: "Sales Unit",
      key: "sales_unit",
      mapping: "transaction_units.sales_unit",
    },
  ],
  "GST Info*": [
    {
      type: "dropdown",
      label: "GST Type",
      options: "gst_type",
      required: true,
      key: "gst_type",
      mapping: "taxes.gst_type",
    },
    {
      type: "text",
      label: "HSN Code",
      required: true,
      key: "hsn_code",
      mapping: "taxes.hsn_code",
    },
  ],
  "Sales Category*": [
    {
      type: "dropdown",
      label: "B2B Product Type",
      options: "b2b_category",
      required: true,
      key: "b2b_category",
      mapping: "sales_category.b2b_category",
    },
    {
      type: "dropdown",
      label: "B2C Product Type",
      options: [],
      required: true,
      key: "b2c_category",
      mapping: "sales_category.b2c_category.category_name",
    },
    {
      type: "dropdown",
      label: "Sales Trend Category",
      options: "sales_trend_category",
      required: true,
      key: "sales_trend_category",
      mapping: "sales_category.sales_trend_category",
    },
    {
      type: "dropdown",
      label: "Return Type",
      options: "product_return_type",
      required: true,
      key: "product_return_type",
      mapping: "sales_category.b2b_category",
    },
    {
      type: "table",
      label: "Return Details",
      key: "return_type",
      conditions: {
        dependsOn: "Return Type",
        values: {
          RETURNABLE: "product_return_details.RETURNABLE",
          NON_RETURNABLE: "product_return_details.NON_RETURNABLE",
        },
      },
      mapping: "sales_category.return_type",
    },
  ],
  "MIS Category*": [
    {
      type: "dropdown",
      label: "Reporting Category",
      options: "mis_reporting_category",
      key: "mis_reporting_category",
      mapping: "mis_reporting_category",
    },
    {
      type: "dropdown",
      label: "WH Category",
      options: "mis_warehouse_category",
      key: "mis_warehouse_category",
      mapping: "mis_warehouse_category",
    },
  ],
};

const generateProductTypeConfig = (productType) => {
  const sections = [
    commonSections.header,
    {
      ...commonSections.basicDetails,
      fields: [
        ...commonSections.basicDetails.commonFields,
        ...(productType === "Goods" ? goodsSpecificFields : []),
      ],
    },
    {
      title: "Section Tabs",
      ...tabConfigs[productType],
    },
    {
      title: "Dynamic Section",
      fields: Object.fromEntries(
        tabConfigs[productType].tabs.map((tab) => [
          tab,
          tab === "Classification"
            ? [
                ...dynamicSectionFields[tab].common,
                ...(dynamicSectionFields[tab][productType] || []),
              ]
            : dynamicSectionFields[tab] || [],
        ])
      ),
    },
    commonSections.footer,
  ];

  return { sections };
};

export const productModalConfig = {
  defaultProductType: "Goods",
  productTypes: {
    Goods: generateProductTypeConfig("Goods"),
    Services: generateProductTypeConfig("Services"),
  },
};

export default productModalConfig;
