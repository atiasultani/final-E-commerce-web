'use client'
import React, { useState } from 'react';

const Header1: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full py-4 bg-black text-white">
      {/* Start up */}
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <p className="text-sm sm:text-base lg:text-lg">
            Sign up and get 20% off your first order.
          </p>
          <a href="/" className="underline cursor-pointer">
            Shop Now
          </a>
        </div>

        <button
          className="text-white hover:text-gray-300 focus:outline-none text-lg"
          onClick={() => setIsVisible(false)}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Header1;
