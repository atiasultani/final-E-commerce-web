import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, address, cartItems, totalAmount } = req.body;
      const order = {
        _type: 'orders',
        name,
        email,
        address,
        cartItems,
        totalAmount,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      
      const response = await client.create(order);
      res.status(201).json({ message: 'Order placed successfully', order: response });
    } catch (error) {
      res.status(500).json({ error: 'Error placing order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
