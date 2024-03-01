'use client'
import React, { useState } from 'react'
import Image from 'next/image';

function SocialImage({ post, index, handleLiked }) {
    const [lastClickTime, setLastClickTime] = useState(0);
    const THRESHOLD = 300; // milisaniye

    const handleDoubleClick = () => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < THRESHOLD) {
            handleLiked(index);
        }
        setLastClickTime(currentTime);
    };
    return (
        <div
            className=''
            onClick={() => handleDoubleClick(index)}
        >
            <Image
                src={post.image_url}
                className="w-full h-full cursor-pointer lg:rounded-md"
                alt="Picture of the author"
                width={1000}
                height={1000}
                id={index}
                draggable={false}
                loading="lazy"
            />
        </div>
    )
}

export default SocialImage