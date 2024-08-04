// pages/api/profile/[id]/get-profile.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query; // Get the user id from the request query parameters

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          followers: true,
          following: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Error fetching user profile" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
