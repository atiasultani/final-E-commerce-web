'use static';

import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

type CheckoutFormProps = {
  totalAmount: number;
  onPaymentSuccess: () => void;
};

export default function CheckoutForm({ totalAmount, onPaymentSuccess }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    // Retrieve the CardElement
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    // Create a payment method using the card information
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Payment error:', error);
      return;
    }

    // Simulate a successful payment with a timeout.
    setTimeout(() => {
      onPaymentSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement options={{ hidePostalCode: true }} />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        disabled={!stripe}
      >
        Pay ${totalAmount.toFixed(2)}
      </button>
    </form>
  );
}
