// // /pages/api/users/login.ts
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
  
//   const { email, password } = req.body;

//   // Replace the following with your actual user lookup and password verification logic
//   const user = await findUserByEmail(email); // Implement findUserByEmail
//   if (!user || !verifyPassword(password, user.password)) { // Implement verifyPassword
//     return res.status(401).json({ error: 'Invalid email or password' });
//   }

//   // Return user details (excluding sensitive data)
//   return res.status(200).json({
//     id: user.id,
//     email: user.email,
//     name: user.name,
//   });
// }

// // Dummy implementations for demonstration
// async function findUserByEmail(email: string) {
//   // Normally, query your database here
//   if (email === "user@example.com") {
//     return { id: "123", email, name: "John Doe", password: "hashedpassword" };
//   }
//   return null;
// }

// function verifyPassword(password: string, hashedPassword: string) {
//   // Replace with your real password verification logic, e.g., bcrypt.compare
//   return password === "password123"; // This is just a placeholder!
// }
