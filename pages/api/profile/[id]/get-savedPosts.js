// pages/api/profile/[id]/get-following.js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          savedPosts: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const postId = user.savedPosts.map((saved) => saved.postId);

      res.status(200).json({ postId });
    } catch (error) {
      console.error("Error fetching following list:", error);
      res.status(500).json({ error: "Error fetching following list" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
