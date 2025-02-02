// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") return <p>Loading...</p>;

//   if (!session) {
//     router.push("/auth/signin");
//     return null;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
//       <p className="text-gray-600">Email: {session.user?.email}</p>
//       <button onClick={() => signOut()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
//         Sign Out
//       </button>
//     </div>
//   );
// }
