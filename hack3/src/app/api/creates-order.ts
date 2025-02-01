import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';
// costumer order data save in api 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const orderData = req.body;
    const response = await client.create(orderData);

    return res.status(200).json({ message: "Order created successfully", data: response });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create order", error });
  }
}

