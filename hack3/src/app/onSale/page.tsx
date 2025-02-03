'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { addTOcart } from '@/components/cartAction/cartFunctions';
import { Product } from '@/components/types/Products';
import Swal from 'sweetalert2';

const getData = async (): Promise<Product[]> => {
  return await client.fetch(`*[_type == "products"][5...12]{
    _id,
    "slug": slug.current,
    mainHeading,
    name,
    price,
    discountedPrice,
    "imageUrl": image.asset->url
  }`);
};

export default function OnSale() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setProducts(data);
    }
    fetchData();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${product.name} added to cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
    addTOcart(product);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        {products[0]?.mainHeading || 'On Sale Items'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/onSale/${product.slug}`}
            className="transform transition-transform hover:scale-105"
          >
            <div className="border rounded-xl p-5 flex flex-col items-center bg-white shadow-lg hover:shadow-2xl transition-shadow cursor-pointer w-full max-w-xs h-auto flex-grow">
              {product.imageUrl && (
                <div className="w-full h-52 relative mb-4">
                  <Image
                    src={urlFor(product.imageUrl).width(400).height(300).url()}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-1">
                Price: <span className="line-through text-red-500">${product.price}</span>
              </p>
              <p className="text-green-600 font-bold text-lg">
                Discounted: ${product.discountPercent}
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition w-full"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add To Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
