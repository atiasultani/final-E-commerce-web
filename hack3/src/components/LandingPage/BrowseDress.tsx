import React from 'react';
import {client} from '@/sanity/lib/client'; // Adjust the path based on your file structure
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

const getData = async () => {
  const response = await client.fetch(
    `*[_type == "browseDress"]{
      title,
      "ImageUrl": image.asset->url
    }`
  );
  return response;
};

const BrowseDress = async () => {
  const products = await getData();
 
  // Explicitly assign variables for each product
  const product1 = products[0];
  const product2 = products[1];
  const product3 = products[2];
  const product4 = products[3];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Browse Dresses</h1>
      <div className="container  grid grid-cols-2 grid-rows-2 gap-6 px-4">
        {/* First Product */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow">
          {product1 && product1.ImageUrl && (
            <div className="w-full h-48 relative mb-4">
              <Image
                src={urlFor(product1.ImageUrl).width(500).height(200).url()}
                alt={product1.title}
                fill
                style={{ objectFit: 'cover' }} // Apply objectFit here
                className="rounded-md"
              />
            </div>
          )}
          <h2 className="text-sm font-medium text-gray-800 text-center">{product1?.title}</h2>
        </div>

        {/* Second Product */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow">
          {product2 && product2.ImageUrl && (
            <div className="w-full h-48 relative mb-4">
              <Image
                src={urlFor(product2.ImageUrl).width(320).height(200).url()}
                alt={product2.title}
                fill
                style={{ objectFit: 'cover' }} // Apply objectFit here
                className="rounded-md"
              />
            </div>
          )}
          <h2 className="text-sm font-medium text-gray-800 text-center">{product2?.title}</h2>
        </div>

        {/* Third Product */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow">
          {product3 && product3.ImageUrl && (
            <div className="w-full h-48 relative mb-4">
              <Image
                src={urlFor(product3.ImageUrl).width(400).height(200).url()}
                alt={product3.title}
                fill
                style={{ objectFit: 'cover' }} // Apply objectFit here
                className="rounded-md "
              />
            </div>
          )}
          <h2 className="text-sm font-medium text-gray-800 text-center">{product3?.title}</h2>
        </div>

        {/* Fourth Product */}
        <div className="bg-white border rounded-lg shadow-md flex flex-col items-center justify-center p-4 hover:shadow-lg transition-shadow">
          {product4 && product4.ImageUrl && (
            <div className="w-full h-48 relative mb-4">
              <Image
                src={urlFor(product4.ImageUrl).width(500).height(200).url()}
                alt={product4.title}
                fill
                style={{ objectFit: 'cover' }} // Apply objectFit here
                className="rounded-md"
              />
            </div>
          )}
          <h2 className="text-sm font-medium text-gray-800 text-center">{product4?.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default BrowseDress;
