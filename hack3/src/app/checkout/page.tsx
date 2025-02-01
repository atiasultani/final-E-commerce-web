'use client';

import React, { useState, useEffect } from 'react';
import { getcartItems, removeItems, addMoreQuantity } from '@/components/cartAction/cartFunctions';
import Swal from 'sweetalert2';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
const [form, setForm] = useState({ name: '', email: '', address: '' });

  useEffect(() => {
    setCartItems(getcartItems());
  }, []);

  const handleRemoveItem = (id: string) => {
    Swal.fire({
      title: "Remove item?",
      text: "Are you sure you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItems(id);
        setCartItems(getcartItems());
        Swal.fire("Deleted!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    addMoreQuantity(id, quantity);
    setCartItems(getcartItems());
  };

  const handleCheckout = () => {
    if (!form.name || !form.email || !form.address) {
      Swal.fire("Error", "Please fill all fields!", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Purchase",
      text: "Are you sure you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, checkout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('cart'); // Clear cart after checkout
        setCartItems([]);
        setForm({ name: '', email: '', address: '' });
        Swal.fire("Success!", "Your order has been placed.", "success");
      }
    });
  };

  // Calculate Subtotal (Original price before discount)
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stock, 0);
  };

  // Calculate Discounted Amount
  const getTotalDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discountPercent > 0) {
        const discountAmount = (item.price * item.discountPercent) / 100;
        return total + discountAmount * item.stock;
      }
      return total;
    }, 0);
  };

  // Final Total after Discount
  const getTotal = () => {
    return getSubtotal() - getTotalDiscount();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cart Items */}
        <div className="bg-zinc-300 shadow-2xl p-6 outline outline-[.5px] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-3">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price} x {item.stock}</p>
                  {item.discountPercent > 0 ? (
                    <>
                      <p className="text-red-500">Discount: {item.discountPercent}%</p>
                      <p className="text-green-600 font-bold">
                        Discounted Price: ${((item.price * (100 - item.discountPercent)) / 100).toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600">No Discount</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.stock - 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.stock}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.stock + 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item._id)} className="text-red-500 font-bold hover:text-red-700">
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
          {/* Subtotal, Discount & Total */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Subtotal: ${getSubtotal().toFixed(2)}</h3>
            <h3 className="text-lg font-semibold text-red-500">
              Discount: -${getTotalDiscount() > 0 ? getTotalDiscount().toFixed(2) : "0"}
            </h3>
            <h3 className="text-xl font-bold text-green-600 mt-2">Total: ${getTotal().toFixed(2)}</h3>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-zinc-300 shadow-2xl p-6 outline outline-[0.5px] rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-700">Shipping Address</label>
              <textarea
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shipping address and contact number "
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
