"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/components/types/Products";
import Image from "next/image";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch all products once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data: Product[] = await client.fetch(`*[_type == "products"]{
        _id,
        "slug": slug.current,
        name,
        price,
        discountPercent,
        "imageUrl": image.asset->url
      }`);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Filter products based on the search query
  useEffect(() => {
    if (query.trim().length === 0) {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [query, products]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredProducts.length > 0 && (
        <ul className="absolute z-10 bg-white border border-t-0 rounded-b-lg w-full max-h-64 overflow-y-auto">
          {filteredProducts.map((product) => (
            <li
              key={product._id}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 border-b last:border-b-0"
            >
              {product.imageUrl && (
                <div className="w-12 h-12 relative">
                  <Image
                    src={urlFor(product.imageUrl).width(50).height(50).url()}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div>
                <Link href={`/shop/${product.slug}`} className="font-medium hover:underline">
                  {product.name}
                </Link>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
