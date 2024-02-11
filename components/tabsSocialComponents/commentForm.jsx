import React, { useState } from 'react'
import { BiUpArrowAlt } from "react-icons/bi";

function CommentForm({ posts, index, setMainPosts }) {
    const [addCommentInputValue, setAddCommentInputValue] = useState("");

    const handleSubmit = (index) => {
        if (addCommentInputValue != "") {
            setMainPosts((prevPosts) =>
                prevPosts.map((post, i) =>
                    i === index ? {
                        ...post, comments: [...(post.comments), {
                            "id": (index * 100) + posts[index].comments.length + 1,
                            "username": "anonim",
                            "comment": addCommentInputValue,
                        }]
                    } : post
                ))
            setAddCommentInputValue("");
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(index)
        }}
            className="group flex items-center border pr-2 mx-4 rounded-full my-4">
            <input
                placeholder="yorum ekle.."
                type="text"
                onChange={(e) => setAddCommentInputValue(e.target.value)}
                value={addCommentInputValue}
                className="commentInput bg-transparent flex-1 pl-2 py-2 outline-none focus:group:bg-white" />
            <button type="submit" className={`disabled:hidden`} disabled={addCommentInputValue == "" && true} >
                <BiUpArrowAlt size={25} />
            </button>
        </form>
    )
}

export default CommentForm