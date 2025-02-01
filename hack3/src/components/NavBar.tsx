"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        My E-Commerce
      </Link>

      <div className="flex gap-4">
        <Link href="/products" className="hover:text-gray-400">
          Products
        </Link>
        {session ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
            <button onClick={() => signOut()} className="bg-red-500 px-4 py-2 rounded-md">
              Sign Out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-500 px-4 py-2 rounded-md">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
