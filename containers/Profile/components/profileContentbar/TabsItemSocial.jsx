"use client";
import React, { useEffect, useState } from "react";
import mockPosts from "@/components/tabsSocialComponents/mock/posts";
import mockUsers from "@/components/tabsSocialComponents/mock/users";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useProfileStore } from "@/store/useProfileStore";

export default function TabsItemSocial() {
  const setOpenpageId = useProfileStore((state) => state.setOpenpageId);
  const setPosts = useProfileStore((state) => state.setPosts);
  const posts = useProfileStore((state) => state.posts);
  const setUsers = useProfileStore((state) => state.setUsers);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(768);

  useEffect(() => {
    setPosts(mockPosts);
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  const handleClick = (index) => {
    setOpenpageId(index);
  };

  return (
    <>
      <div className="flex flex-col gap-5 pb-5 relative overflow-x-hidden  overflow-hidden  md:h-[calc(100vh_-_302px)] mt-10">
        <div className=" overflow-y-auto ">
          <div className="flex justify-center flex-wrap gap-4">
            {posts.map((post, index) => (
              <button
                key={index}
                className="relative group w-[100px] h-[100px]  md:w-[200px] md:h-[200px]"
                onClick={() => handleClick(index)}
              >
                <Image
                  src={post.image_url}
                  className=" w-full h-full md:h-full xl:h-full cursor-pointer object-cover"
                  alt="Picture of the author"
                  width={700}
                  height={700}
                  loading="lazy"
                  id={index}
                  draggable={false}
                />
                {post.video_url && (
                  <MdOutlineVideoLibrary
                    size={isMobile ? 20 : 30}
                    className=" absolute top-2 right-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                  />
                )}
                <div className="absolute hidden  justify-center items-center w-full h-full top-0 left-0 font-semibold md:text-desktop text-white group-hover:flex">
                  click to view
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
