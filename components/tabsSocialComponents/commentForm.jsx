import React, { useState } from "react";
import { BiUpArrowAlt } from "react-icons/bi";

function CommentForm({ posts, index, setMainPosts, postId }) {
  const [addCommentInputValue, setAddCommentInputValue] = useState("");

  const handleSubmit = async (index) => {
    if (addCommentInputValue !== "") {
      try {
        const response = await fetch(`/api/postComment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            username: "anonim",
            userID: "anonim",
            timestamp: new Date().toISOString(),
            comment: addCommentInputValue,
          }),
        });

        if (response.ok) {
          const newComment = await response.json();

          setMainPosts(
            posts.map((post, i) =>
              i === index
                ? {
                    ...post,
                    comments: [...post.comments, newComment],
                  }
                : post
            )
          );
          setAddCommentInputValue("");
        } else {
          console.error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(index);
      }}
      className="group flex items-center border pr-2 mx-4 rounded-full my-4"
    >
      <input
        placeholder="yorum ekle.."
        type="text"
        onChange={(e) => setAddCommentInputValue(e.target.value)}
        value={addCommentInputValue}
        className="commentInput bg-transparent flex-1 pl-2 py-2 outline-none focus:group:bg-white"
      />
      <button
        type="submit"
        className={`disabled:hidden`}
        disabled={addCommentInputValue === ""}
      >
        <BiUpArrowAlt size={25} />
      </button>
    </form>
  );
}

export default CommentForm;
