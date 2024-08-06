import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { postId, isSaved, userId } = req.body;

  try {
    if (isSaved) {
      await prisma.savedPost.deleteMany({
        where: {
          userId: userId,
          postId: postId,
        },
      });
      return res.status(200).json({ message: "removed" });
    } else {
      await prisma.savedPost.create({
        data: {
          user: {
            connect: { id: userId },
          },
          post: {
            connect: { id: postId },
          },
        },
      });
      return res.status(200).json({ message: "saved" });
    }
  } catch (error) {
    console.error("Error updating saved post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
