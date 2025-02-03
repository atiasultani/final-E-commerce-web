// Using try/catch with a properly typed error (using unknown)
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Your logic to fetch or manipulate products
    res.status(200).json({ message: "Products fetched successfully" });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
