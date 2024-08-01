import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allPosts = await prisma.post.findMany({
        include: {
          comments: true, // Ensure comments are included if needed
        },
      });
      res.json(allPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve posts" });
    }
  } else if (req.method === "POST") {
    try {
      console.log(req.body); // Debugging line to see incoming data

      const {
        userID,
        username,
        caption,
        category,
        isLiked,
        image_url,
        saveBook,
        likes,
        comments,
        timestamp,
        type,
        video_url,
      } = req.body;

      const createdPost = await prisma.post.create({
        data: {
          userID, // Field available in Post model
          username, // Field available in Post model
          caption,
          category,
          isLiked,
          image_url,
          saveBook,
          likes,
          comments: {
            create: comments || [], // Creates associated comments if any
          },
          timestamp,
          type,
          video_url,
        },
      });
      console.log(createdPost);
      res.status(201).json(createdPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Post creation failed" });
    }
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: id,
        },
        data: data,
      });
      // Fetch updated posts and return as response
      const response_data = await prisma.post.findMany({});
      res.json(response_data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Post update failed" });
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id; // or req.body.id; depending on the request type
    try {
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Post deletion failed" });
    }
  } else {
    res.status(405).json({ statusCode: 405, message: "Method Not Allowed" });
  }
}
