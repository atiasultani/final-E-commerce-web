import React from 'react';
import { client } from '@/sanity/lib/client';

// Define a TypeScript interface for the product data
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  discountPercent: number;
  new: boolean;
  colors: string[];
  sizes: string[];
  mainHeading: string;
}

// Fetch the data with proper typing
const getData = async (): Promise<Product[]> => {
  const response = await client.fetch(`*[_type == "products"]{
    _id,
    name,
    price,
    description,
    category,
    discountPercent,
    new,
    colors,
    sizes,
  }`);
  return response;
};

const Detail = async () => {
  const products = await getData();

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 border-b-4 border-blue-500 pb-2">
        {products[0]?.mainHeading || 'Product Details'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-xl p-3 ml-4 bg-white shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 cursor-pointer w-full max-w-sm mx-auto text-center"
          >
            <h2 className="text-[14px] font-bold text-gray-900">Product ID: {product._id}</h2>
            <p className="text-gray-700 mt-2"><span className="font-bold text-black">Name:</span> {product.name}</p>
            <p className="text-gray-600 mt-2"><span className="font-bold text-black">Description:</span> {product.description}</p>
            <p className="text-gray-700 mt-2"><span className="font-bold text-black">Category:</span> {product.category}</p>
            <p className="text-gray-900 mt-2 font-bold"><span className="font-bold text-black">Price:</span> ${product.price}</p>
            <p className="text-red-600 mt-2 font-bold"><span className="font-bold text-black">Discount:</span> {product.discountPercent}%</p>
            <p className="text-gray-700 mt-2"><span className="font-bold text-black">Sizes:</span> {product.sizes.join(', ')}</p>
            <p className="text-gray-700 mt-2"><span className="font-bold text-black">Colors:</span> {product.colors.join(', ')}</p>
            <p className={`mt-2 font-bold ${product.new ? 'text-green-600' : 'text-gray-500'}`}>
              <span className='font-bold text-black'>New Arrival:</span> {product.new ? 'Yes' : 'No'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
