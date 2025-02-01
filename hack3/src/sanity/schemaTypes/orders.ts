export default {
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
      { name: 'name', title: 'Customer Name', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'address', title: 'Shipping Address', type: 'text' },
      {
        name: 'cartItems',
        title: 'Cart Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: '_id', title: 'Product ID', type: 'string' },
              { name: 'name', title: 'Product Name', type: 'string' },
              { name: 'price', title: 'Price', type: 'number' },
              { name: 'discount', title: 'Discount', type: 'number' },
              { name: 'quantity', title: 'Quantity', type: 'number' },
            ],
          },
        ],
      },
      { name: 'totalAmount', title: 'Total Amount', type: 'number' },
      {
        name: 'status',
        title: 'Order Status',
        type: 'string',
        options: { list: ['Pending', 'Processing', 'Shipped', 'Delivered'] },
      },
      { name: 'createdAt', title: 'Created At', type: 'datetime' },
    ],
  };
  