'use client'
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await client.fetch('*[_type == "orders"] | order(createdAt desc)');
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">Order History</h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 bg-white shadow-md">
            <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
            <p className="text-gray-600">Customer: {order.customerName}</p>
            <p className="text-gray-600">Email: {order.email}</p>
            <p className="text-gray-600">Status: <span className="font-bold text-blue-600">{order.status}</span></p>

            <h3 className="mt-2 font-bold">Items:</h3>
            <ul>
              {order.items.map((item: any) => (
                <li key={item.productId} className="text-gray-700">
                  {item.name} (x{item.quantity}) - ${item.totalPrice.toFixed(2)}
                </li>
              ))}
            </ul>

            <h3 className="mt-2 font-bold">Total Amount: ${order.totalAmount.toFixed(2)}</h3>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
