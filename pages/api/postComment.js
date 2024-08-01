import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allComments = await prisma.postComment.findMany();
      res.json(allComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve adverts" });
    }
  } else if (req.method === "POST") {
    const { postId, username, comment, userID, timestamp } = req.body;

    try {
      const newComment = await prisma.postComment.create({
        data: {
          postId: postId,
          username: username,
          comment: comment,
          userID: userID,
          timestamp: timestamp,
        },
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    try {
      const updatedComment = await prisma.postComment.update({
        where: {
          id: id,
        },
        data: data,
      });
      const response_data = await prisma.postComment.findMany({});
      res.json(response_data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "comment update failed" });
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id; // veya req.body.id; duruma göre
    try {
      await prisma.postComment.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "comment deletion failed" });
    }
  } else {
    res.status(405).json({ statusCode: 405, message: "Method Not Allowed" });
  }
}
