'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchBar from './SearchBar';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white shadow pt-16">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo & Main Navigation */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-2xl font-extrabold text-gray-900 whitespace-nowrap">SHOP.CO</h1>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/shop" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              Shop
            </Link>
            <Link href="/onSale" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              On Sale
            </Link>
            <Link href="/newArrivals" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              New Arrivals
            </Link>
            <Link href="/brands" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              Brands
            </Link>
            <Link href="/listProduct" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              Products
            </Link>
            <Link href="/detailProduct" className="text-sm whitespace-nowrap hover:underline hover:text-blue-600">
              Product Details
            </Link>
          </nav>
        </div>

        {/* Right-side: Search, Cart, Profile & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Cart Icon */}
          <Link href="/cart">
            <Image
              src="/header2/cart-icon.svg"
              alt="Cart"
              width={24}
              height={24}
              className="hover:opacity-75 transition"
            />
          </Link>

          {/* Profile Icon */}
          <Link href="/profile">
            <Image
              src="/header2/dp-icon.png"
              alt="Profile"
              width={24}
              height={24}
              className="rounded-full hover:opacity-75 transition"
            />
          </Link>

          {/* Mobile Menu (Visible on small screens only) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent className="p-4">
                <nav className="flex flex-col gap-4">
                  <Link href="/shop" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    Shop
                  </Link>
                  <Link href="/onSale" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    On Sale
                  </Link>
                  <Link href="/newArrivals" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    New Arrivals
                  </Link>
                  <Link href="/brands" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    Brands
                  </Link>
                  <Link href="/listProduct" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    Products
                  </Link>
                  <Link href="/detailProduct" className="text-sm whitespace-nowrap hover:underline" onClick={toggleMobileMenu}>
                    Product Details
                  </Link>
                  {/* Optionally, add SearchBar here for mobile */}
                  <div className="mt-4">
                    <SearchBar />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
