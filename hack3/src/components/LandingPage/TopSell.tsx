import React from 'react';
import {client} from '@/sanity/lib/client'; // Adjust the path based on your file structure
import { urlFor } from '@/sanity/lib/image'; // Ensure that urlFor is properly imported
import Image from 'next/image';
import Link from 'next/link';

// Define a TypeScript interface for the product data
interface Product {
  _id: string;
  mainHeading: string;
  title: string;
  price: number;
  discountedPrice: number;
  imageUrl: string; // Ensure imageUrl is a string URL
}

// Fetch the data with proper typing
const getData = async (): Promise<Product[]> => {
  const response = await client.fetch(`*[_type == "products"][1...5] {
    _id,
    mainHeading,
    title,
    price,
    discountedPrice,
    "imageUrl": image.asset->url
  }`);
  return response;
};

const NewArrivals = async () => {
  const products = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {products[0]?.mainHeading || 'TOP SELLING PRODUCTS'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition-shadow"
          >
            {product.imageUrl && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={urlFor(product.imageUrl).width(400).height(300).url()} // Use urlFor to generate the image URL
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-800 text-center">{product.title}</h2>
            <p className="text-gray-500">Price: ${product.price}</p>
            <p className="text-green-600 font-bold">
              Discounted: ${product.discountedPrice}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/brands">
          <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewArrivals;
