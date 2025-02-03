const orderSchema = {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "customerName", title: "Customer Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "items", title: "Items", type: "array", of: [{ type: "reference", to: [{ type: "product" }] }] },
    { name: "totalAmount", title: "Total Amount", type: "number" },
    { name: "status", title: "Status", type: "string", options: { list: ["Pending", "Paid", "Shipped", "Delivered"] } },
  ],
};

export default orderSchema;
