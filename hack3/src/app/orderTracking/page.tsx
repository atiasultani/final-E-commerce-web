'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Swal from 'sweetalert2';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    if (!orderId.trim()) {
      Swal.fire('Error', 'Please enter a valid order ID', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await client.fetch(
        `*[_type == "orders" && _id == $orderId][0]`,
        { orderId }
      );
      setOrder(data);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch order details', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Track Your Order</h1>
      <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg">
        <input
          type="text"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          onClick={fetchOrder}
          className="w-full bg-blue-600 text-white font-bold py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
        >
          Track Order
        </button>
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {order && (
        <div className="mt-6 bg-white shadow-lg p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-center">Order Details</h2>
          <p className="text-gray-700 mt-2"><strong>Status:</strong> {order.status}</p>
          <p className="text-gray-700"><strong>Customer:</strong> {order.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {order.email}</p>
          <p className="text-gray-700"><strong>Address:</strong> {order.address}</p>
          <p className="text-gray-700"><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <h3 className="text-lg font-semibold mt-4">Items:</h3>
          {order.cartItems?.map((item: any) => (
            <div key={item._id} className="border-b py-2">
              <p className="text-gray-700"><strong>{item.name}</strong></p>
              <p className="text-gray-500">Price: ${item.price} x {item.quantity}</p>
              <p className="text-green-500">Discount: ${item.discount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
