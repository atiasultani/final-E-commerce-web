'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { addTOcart } from '@/components/cartAction/cartFunctions';
import { Product } from "@/components/types/Products";
import Swal from 'sweetalert2';

const getData = async (): Promise<Product[]> => {
  return await client.fetch(`*[_type == "products"]{
    _id,
    "slug": slug.current,
    mainHeading,
    name,
    price,
    discountedPrice,
    "imageUrl": image.asset->url
  }`);
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getData();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "center-right",
      icon: "success",
      title: `${product.name}`,
      showConfirmButton: false,
      timer: 1500,
    });
    addTOcart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {products[0]?.mainHeading || 'Our Shop Items'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/shop/${product.slug}`}>
            <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow cursor-pointer">
              <div>
                {product.imageUrl && (
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={urlFor(product.imageUrl).width(400).height(300).url()}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                    />
                  </div>
                )}
                <h2 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h2>
                <p className="text-gray-500">Price: ${product.price}</p>
                <p className="text-green-600 font-bold">Discounted: ${product.discountPercent}</p>
              </div>
              <div>
                <button
                  className="bg-blue-600 text-white px-4 py-3 mt-3 rounded-lg"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
