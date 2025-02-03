'use client';

import React from "react";
import { Product } from "@/components/types/Products";
import { addTOcart } from "@/components/cartAction/cartFunctions";
import Swal from "sweetalert2";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
    addTOcart(product);
  };

  return (
    <button
      className="bg-black text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition"
      onClick={handleAddToCart}
    >
      Add To Cart
    </button>
  );
}
