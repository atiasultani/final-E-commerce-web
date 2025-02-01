'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/components/types/Products';
import { addMoreQuantity, getcartItems, removeItems } from '@/components/cartAction/cartFunctions';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash, Minus, Plus } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getcartItems());
  }, []);

  const handleRemoveItem = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      text: 'You will remove this item from your cart.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItems(id);
        setCartItems(getcartItems());
        Swal.fire('Removed!', 'Item has been removed.', 'success');
      }
    });
  };

  const handleQuantity = (id: string, quantity: number) => {
    addMoreQuantity(id, quantity);
    setCartItems(getcartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantity(id, product.stock + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.stock > 1) {
      handleQuantity(id, product.stock - 1);
    }
  };
 
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stock, 0);
  };
  const router=useRouter();
  const handleProceed = () => {
    Swal.fire({
      title: 'Proceed to checkout?',
      icon: 'warning',
      text: 'You will proceed to the checkout process.',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Success!', 'Your order is being processed.', 'success');
        router.push("/checkout")
        setCartItems([]);
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <Card key={item._id} className="p-4 flex justify-between items-center">
              <CardContent className="flex items-center gap-4">
                <div>
                      {item.imageUrl && (
                              <div className="w-full h-48 relative mb-4">
                                <Image
                                  src={urlFor(item.imageUrl).width(400).height(300).url()}
                                  alt={item.name}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                              </div>
                            )}

                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => handleDecrement(item._id)} variant="outline">
                    <Minus size={16} />
                  </Button>
                  <span className="text-lg font-semibold">{item.stock}</span>
                  <Button onClick={() => handleIncrement(item._id)} variant="outline">
                    <Plus size={16} />
                  </Button>
                </div>
              </CardContent>
              <Button onClick={() => handleRemoveItem(item._id)} variant="destructive">
                <Trash size={16} />
              </Button>
            </Card>
          ))}
          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-bold">Total: ${getTotal().toFixed(2)}</h2>
            <Button onClick={handleProceed} variant="default" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
