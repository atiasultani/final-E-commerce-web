// 'use client'
// import React, { useEffect, useState } from "react";
// import { client } from "@/sanity/lib/client";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const data = await client.fetch('*[_type == "orders"] | order(createdAt desc)');
//       setOrders(data);
//     };
//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId: string, status: string) => {
//     await client.patch(orderId).set({ status }).commit();
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order._id === orderId ? { ...order, status } : order
//       )
//     );
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-3xl font-bold text-center mb-4">Admin Orders</h1>

//       {orders.length > 0 ? (
//         orders.map((order) => (
//           <div key={order._id} className="border p-4 mb-4 bg-white shadow-md">
//             <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
//             <p className="text-gray-600">Customer: {order.customerName}</p>
//             <p className="text-gray-600">Email: {order.email}</p>

//             <label className="font-bold">Status:</label>
//             <select
//               className="border p-2 ml-2"
//               value={order.status}
//               onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Processing">Processing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Delivered">Delivered</option>
//             </select>

//             <h3 className="mt-2 font-bold">Total Amount: ${order.totalAmount.toFixed(2)}</h3>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 text-center">No orders found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;
