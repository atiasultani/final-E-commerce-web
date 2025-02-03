'use client';

import React, { useState, useEffect } from 'react';
import { getcartItems, removeItems } from '@/components/cartAction/cartFunctions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import Swal from 'sweetalert2';

// Load your publishable Stripe key from environment variables.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [consumerInfo, setConsumerInfo] = useState({ name: '', email: '', address: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage (or wherever they are stored)
    setCartItems(getcartItems());
  }, []);

  const handleRemoveItem = (id: string) => {
    Swal.fire({
      title: 'Remove item?',
      text: 'Are you sure you want to remove this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItems(id);
        setCartItems(getcartItems());
        Swal.fire('Deleted!', 'Item has been removed.', 'success');
      }
    });
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stock, 0);
  };

  // This callback is called after a successful payment.
  const handlePaymentSuccess = () => {
    // Capture the total before clearing the cart
    const total = getTotal();
    setTotalPaid(total);

    Swal.fire({
      icon: 'success',
      title: 'Payment Successful',
      text: 'Your order has been processed successfully!',
      timer: 3000,
      showConfirmButton: false,
    });
    // Clear cart after payment (if desired)
    localStorage.removeItem('cart');
    setCartItems([]);
    setPaymentSuccess(true);
  };

  // If payment was successful, show a thank-you page with order details.
  if (paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Shopping!</h1>
        <p className="text-xl mb-2">Total Paid: ${totalPaid.toFixed(2)}</p>
        <p className="text-lg">A confirmation email has been sent to {consumerInfo.email}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Summary */}
        <div className="bg-gray-100 shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b py-3">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">
                    Price: ${item.price} x {item.stock}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
          <h3 className="text-xl font-bold mt-4">
            Total: ${getTotal().toFixed(2)}
          </h3>
        </div>

        {/* Consumer Details and Payment Form */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={consumerInfo.name}
              onChange={(e) => setConsumerInfo({ ...consumerInfo, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={consumerInfo.email}
              onChange={(e) => setConsumerInfo({ ...consumerInfo, email: e.target.value })}
            />
            <textarea
              placeholder="Shipping Address"
              className="w-full p-2 border rounded"
              value={consumerInfo.address}
              onChange={(e) => setConsumerInfo({ ...consumerInfo, address: e.target.value })}
            />
          </form>

          {/* Stripe Payment Form */}
          <Elements
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: getTotal() * 100, // Stripe expects the amount in cents
              currency: 'usd',
            }}
          >
            <CheckoutForm totalAmount={getTotal()} onPaymentSuccess={handlePaymentSuccess} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
