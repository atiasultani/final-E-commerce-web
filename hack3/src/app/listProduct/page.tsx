import React from 'react';
import { client } from '@/sanity/lib/client'; // Adjust the path based on your file structure

// Define a TypeScript interface for the product data
interface Product {
  _id: string;
  mainHeading: string;
  name: string;
}

// Fetch the data with proper typing
const getData = async (): Promise<Product[]> => {
  const response = await client.fetch(`*[_type == "products"]{
    _id,
    mainHeading,
    name,
  }`);
  return response;
};

const ListProduct = async () => {
  const products = await getData();

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8 border-b-4 border-blue-500 pb-2">
        {products[0]?.mainHeading || 'List of Products'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-xl p-6 flex flex-col items-center bg-white shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 cursor-pointer w-full max-w-xs h-auto flex-grow text-center"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-500"> Product Name</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
