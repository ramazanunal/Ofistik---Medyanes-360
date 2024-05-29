'use client'
import React, { useState } from "react";
import MainCreateAdvert from '@/components/Campaign/mainCreateAdvert'

const Page = () => {
    const [initialValueAdded, setInitialValueAdded] = useState();
    const postList = [
        //HİZMET VERENLERİN GÖNDERİLERİNİ ALACAĞIMIZ YER
        {
            id: "1",
            img: '/img/post.png',
            postDate: "02/02/2024",
            details: "#ofistik",
            like: 90,
            views: 540,
            comment: 8,
        },
        {
            id: "2",
            img: '/img/post.png',
            postDate: "02/02/2024",
            details: "#ofistik",
            like: 90,
            views: 540,
            comment: 8,
        },
        {
            id: "3",
            img: '/img/post.png',
            postDate: "02/02/2024",
            details: "#ofistik",
            like: 90,
            views: 540,
            comment: 8,
        },
        {
            id: "4",
            img: '/img/post.png',
            postDate: "02/02/2024",
            details: "#ofistik",
            like: 90,
            views: 540,
            comment: 8,
        },
        {
            id: "5",
            img: '/img/post.png',
            postDate: "02/02/2024",
            details: "#ofistik",
            like: 90,
            views: 540,
            comment: 8,
        },
    ];

    return (
        <MainCreateAdvert
            postList={postList}
            setInitialValueAdded={setInitialValueAdded}
            initialValueAdded={initialValueAdded}
        />
    )
}

export default Page