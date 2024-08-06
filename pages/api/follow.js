import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { userIdToFollow, followerId } = req.body;

  if (req.method === "POST") {
    try {
      if (!userIdToFollow || !followerId) {
        return res.status(400).json({ error: "User IDs must be provided" });
      }

      const existingFollow = await prisma.follow.findFirst({
        where: {
          followerId: followerId,
          followingId: userIdToFollow,
        },
      });

      let message;

      if (existingFollow) {
        await prisma.follow.delete({
          where: {
            id: existingFollow.id,
          },
        });
        message = "Unfollowed successfully";
      } else {
        await prisma.follow.create({
          data: {
            followerId: followerId,
            followingId: userIdToFollow,
          },
        });
        message = "Followed successfully";
      }

      res.status(200).json({ message });
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
