// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function AdminPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   if (!session) {
//     router.push("/auth/signin");
//     return null;
//   }

//   // Example: Only allow admin users (assuming "admin@example.com" is an admin)
//   if (session.user?.email !== "admin@example.com") {
//     return <p className="text-red-500 text-center mt-10">Access Denied. Admins Only.</p>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p className="text-gray-600">Welcome, Admin!</p>
//     </div>
//   );
// }
