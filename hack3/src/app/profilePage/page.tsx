"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) return <p className="text-center mt-10">Please sign in to see your profile.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="text-gray-600">Name: {session.user?.name}</p>
      <p className="text-gray-600">Email: {session.user?.email}</p>
      {session.user?.image && <img src={session.user.image} alt="User avatar" className="w-16 h-16 rounded-full mt-4" />}
    </div>
  );
}
