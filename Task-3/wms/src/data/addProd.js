export const productModalConfig = {
  defaultProductType: "Goods",
  productTypes: {
    Goods: {
      sections: [
        {
          title: "Header",
          fields: [
            {
              type: "title",
              label: "Add Product",
            },
            {
              type: "button",
              label: "Close",
            },
          ],
        },
        {
          title: "Basic Details",
          fields: [
            {
              type: "text",
              label: "Product Name",
              required: true,
            },
            {
              type: "dropdown",
              label: "Product Type",
              options: ["Goods", "Services"],
              required: true,
              default: "Goods",
            },
            {
              type: "text",
              label: "Wondersoft Code",
              disabled: true,
            },
            {
              type: "text",
              label: "Product Code",
              disabled: true,
            },
            {
              type: "dropdown",
              label: "Manufacturer",
              options: [],
              required: true,
            },
            {
              type: "number",
              label: "MRP",
              required: true,
            },
          ],
        },
        {
          title: "Section Tabs",
          tabs: [
            "Packaging & Units",
            "Molecule Composition",
            "Classification",
            "Transaction Units",
            "GST Info",
            "Sales Category",
            "MIS Category",
          ],
          default: "Packaging & Units",
        },
        {
          title: "Dynamic Section",
          fields: {
            "Packaging & Units": [
              {
                type: "dropdown",
                label: "Dosage Form",
                options: "dosage_form",
                required: true,
              },
              {
                type: "dropdown",
                label: "Package Type",
                options: "package_type",
                required: true,
              },
              {
                type: "dropdown",
                label: "UOM",
                options: "uom",
                required: true,
              },
              {
                type: "number",
                label: "Package Size",
              },
            ],
            "Molecule Composition": [
              {
                type: "dropdown",
                label: "Molecules",
                options_api: "API_ENDPOINT_FOR_MOLECULES",
                required: true,
              },
            ],
            Classification: [
              {
                type: "dropdown",
                label: "Is Assured",
                options: ["Yes", "No"],
                required: true,
              },
              {
                type: "dropdown",
                label: "Discontinued",
                disabled: true,
              },
              {
                type: "dropdown",
                label: "Banned",
                options: ["Yes", "No"],
                required: true,
              },
              {
                type: "dropdown",
                label: "Is Active",
                options: ["Yes", "No"],
                required: true,
              },
              {
                type: "dropdown",
                label: "Is Hidden From Alternate",
                options: ["Yes", "No"],
              },
              {
                type: "text",
                label: "Rx Required",
                disabled: true,
              },
              {
                type: "text",
                label: "Can Sell Online",
                disabled: true,
              },
              {
                type: "text",
                label: "Chronic",
                disabled: true,
              },
              {
                type: "text",
                label: "Refrigerated",
                disabled: true,
              },
              {
                type: "text",
                label: "Scheduled Type Code",
                options: "schedule_type_code",
                disabled: true,
              },
            ],
            "Transaction Units": [
              {
                type: "number",
                label: "Purchase Unit",
              },
              {
                type: "number",
                label: "Transfer Unit",
              },
              {
                type: "number",
                label: "Sales Unit",
              },
              {
                type: "number",
                label: "Package Size",
              },
            ],
            "GST Info": [
              {
                type: "dropdown",
                label: "GST Type",
                options: "gst_type",
                required: true,
              },
              {
                type: "text",
                label: "HSN Code",
                required: true,
              },
            ],
            "Sales Category": [
              {
                type: "dropdown",
                label: "B2B Product Type",
                options: "b2b_category",
                required: true,
              },
              {
                type: "dropdown",
                label: "B2C Product Type",
                options: [],
                required: true,
              },
              {
                type: "dropdown",
                label: "Sales Trend Category",
                options: "sales_trend_category",
                required: true,
              },
              {
                type: "dropdown",
                label: "Return Type",
                options: "product_return_type",
                required: true,
              },
              {
                type: "table",
                label: "Return Details",
                conditions: {
                  dependsOn: "Return Type",
                  values: {
                    RETURNABLE: "product_return_details.RETURNABLE",
                    NON_RETURNABLE: "product_return_details.NON_RETURNABLE",
                  },
                },
              },
            ],
            "MIS Category": [
              {
                type: "dropdown",
                label: "Reporting Category",
                options: "mis_reporting_category",
              },
              {
                type: "dropdown",
                label: "WH Category",
                options: "mis_warehouse_category",
              },
            ],
          },
        },
        {
          title: "Footer",
          fields: [
            {
              type: "button",
              label: "Save",
              action: "submit",
            },
          ],
        },
      ],
    },
    Services: {
      sections: [
        {
          title: "Header",
          fields: [
            {
              type: "title",
              label: "Add Product",
            },
            {
              type: "button",
              label: "Close",
            },
          ],
        },
        {
          title: "Basic Details",
          fields: [
            {
              type: "text",
              label: "Product Name",
              required: true,
            },
            {
              type: "dropdown",
              label: "Product Type",
              options: ["Goods", "Services"],
              required: true,
            },
            {
              type: "text",
              label: "Wondersoft Code",
              disabled: true,
            },
            {
              type: "text",
              label: "Product Code",
              disabled: true,
            },
          ],
        },
        {
          title: "Section Tabs",
          tabs: ["Classification", "GST Info", "MIS Category"],
          default: "Classification",
        },
        {
          title: "Dynamic Section",
          fields: {
            Classification: [
              {
                type: "dropdown",
                label: "Is Assured",
                options: ["Yes", "No"],
                required: true,
              },
            ],
            "GST Info": [
              {
                type: "dropdown",
                label: "GST Type",
                options: "gst_type",
                required: true,
              },
              {
                type: "text",
                label: "HSN Code",
                required: true,
              },
            ],
            "MIS Category": [
              {
                type: "dropdown",
                label: "Reporting Category",
                options: "mis_reporting_category",
              },
              {
                type: "dropdown",
                label: "WH Category",
                options: "mis_warehouse_category",
              },
            ],
          },
        },
        {
          title: "Footer",
          fields: [
            {
              type: "button",
              label: "Save",
              action: "submit",
            },
          ],
        },
      ],
    },
  },
};

export default productModalConfig;
