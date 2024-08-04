// pages/api/users/get-all-users.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany({
        include: {
          followers: true, // Include followers if needed
          following: true, // Include following if needed
        },
      });

      // Send the users as a response
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    // Handle other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
