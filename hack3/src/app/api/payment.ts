// //before use run command in cmd npm install stripe

// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2023-10-16',
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { cartItems } = req.body;

//       const lineItems = cartItems.map((item: any) => ({
//         price_data: {
//           currency: 'usd',
//           product_data: { name: item.name },
//           unit_amount: Math.round((item.price - (item.discount || 0)) * 100),
//         },
//         quantity: item.quantity,
//       }));

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: lineItems,
//         mode: 'payment',
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/cancel`,
//       });

//       res.status(200).json({ id: session.id });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating payment session' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
