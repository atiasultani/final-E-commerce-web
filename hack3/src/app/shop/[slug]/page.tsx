// This file is a Server Component—do not include 'use client'
import React from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Product } from "@/components/types/Products";
import dynamic from "next/dynamic";

// Dynamically import the client-only AddToCartButton component (disable SSR)
const AddToCartButton = dynamic(
  () => import("@/components/AddToCartButton"),
  { ssr: false }
);

// Fetch a single product based on slug (async function is allowed in Server Components)
async function getProduct(slug: string): Promise<Product | null> {
  const product = await client.fetch(
    `*[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      price,
      description,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      category,
      discountPercent,
      new,
      colors,
      sizes
    }`,
    { slug }
  );
  return product || null;
}

// Dynamic Product Page Component (Server Component)
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  // If no product found, show 404 page
  if (!product) {
    notFound();
  }

  const discountedPrice = (
    product.price * (1 - product.discountPercent / 100)
  ).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex justify-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-4">
        <p className="text-green-700">{product.new}</p>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex items-center space-x-4">
          <p className="text-xl font-semibold text-red-600">
            ${discountedPrice}
          </p>
          <p className="text-lg text-gray-500 line-through">
            ${product.price}
          </p>
        </div>
        <div>
          <p className="font-semibold">Available Colors:</p>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Available Sizes:</p>
          <div className="flex space-x-2">
            {product.sizes.map((size, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-gray-400 rounded-md text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        {/* Render the client component for Add To Cart functionality */}
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
