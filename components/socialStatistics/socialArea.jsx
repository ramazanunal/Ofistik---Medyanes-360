"use client";
import React, { useEffect, useState } from "react";
import mockPosts from "@/components/tabsSocialComponents/mock/posts";
import mockUsers from "@/components/tabsSocialComponents/mock/users";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import ChoseType from "@/components/ChoseType";
import { FaPlus } from "react-icons/fa6";
import { useProfileStore } from "@/store/useProfileStore";

export default function SocialArea() {
  const setOpenpageId = useProfileStore((state) => state.setOpenpageId);
  const setPosts = useProfileStore((state) => state.setPosts);
  const posts = useProfileStore((state) => state.posts);
  const setUsers = useProfileStore((state) => state.setUsers);
  const setOpenAddPost = useProfileStore((state) => state.setOpenAddPost);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery(768);
  const [activeComponent, setActiveComponent] = useState("Takip ettiklerim");

  useEffect(() => {
    setPosts(mockPosts);
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  const handleClick = (index) => {
    setOpenpageId(index);
  };

  const changeComponent = (header) => {
    setActiveComponent(header);
  };

  return (
    <>
      <div className="flex mx-5 items-center lg:justify-center flex-row flex-wrap pb-5 md:py-0 lg:mx-8">
        <div className="md:px-5 w-[80%] flex-wrap">
          <ChoseType
            headers={["Takip ettiklerim", "Keşfet", "Kaydedilenler"]}
            changeComponent={changeComponent}
            activeComponent={activeComponent}
            className="w-full"
          />
        </div>
        <div className=" mx-1">
          <button
            onClick={() => {
              setOpenAddPost(true);
            }}
            type="button"
            className="flex items-center gap-2 font-semibold px-3 md:px-5 py-1 md:py-1 rounded-xl transition-colors duration-150 bg-white border-2 border-premiumOrange text-premiumOrange hover:bg-premiumOrange hover:text-white "
          >
            <span>Ekle</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 pb-5 relative overflow-x-hidden  overflow-hidden  md:h-[calc(100vh_-_302px)] mt-10">
        <div className=" overflow-y-auto ">
          <div className="flex justify-center flex-wrap gap-4">
            {posts.map((post, index) => (
              <button
                key={index}
                className="relative group w-[130px] h-[130px]  md:w-[250px] md:h-[250px]"
                onClick={() => handleClick(index)}
              >
                <Image
                  src={post.image_url.src}
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
