"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useProfileStore } from "@/store/useProfileStore";
import HorizontalCarousel from "../tabsSocialComponents/HorizontalCarousel";
import HorizontalSocial from "./socialHorizontal";
import { FaUserFriends, FaRegCompass, FaRegSave } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function SocialAreaForUser() {
  const { data: session, status } = useSession();
  const setOpenpageId = useProfileStore((state) => state.setOpenpageId);
  const [posts, setPosts] = useState([]);
  const [followPosts, setFollowPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const setUsers = useProfileStore((state) => state.setUsers);
  const [loading, setLoading] = useState(true);
  const users = useProfileStore((state) => state.users);
  const openPageId = useProfileStore((state) => state.openPageId);
  const isMobile = useMediaQuery(768);
  const [activeComponent, setActiveComponent] = useState("Takip ettiklerim");

  useEffect(() => {
    if (status === "loading") {
      return; // Loading state
    }

    if (status === "authenticated") {
      const userID = session.user.id;
      const fetchFollowingIds = async () => {
        try {
          const response = await fetch(`/api/profile/${userID}/get-following`);
          const responseSaved = await fetch(
            `/api/profile/${userID}/get-savedPosts`
          );
          const { followingIds } = await response.json();
          const { postId } = await responseSaved.json();
          const responsePosts = await fetch("/api/post");
          const allPosts = await responsePosts.json();
          setPosts(allPosts);
          const filteredPosts = allPosts.filter((post) =>
            followingIds.includes(post.userID)
          );
          const savedPosts = allPosts.filter((post) =>
            postId.includes(post.id)
          );
          setFollowPosts(filteredPosts);
          setSavedPosts(savedPosts);
        } catch (error) {
          console.error("Failed to fetch posts", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFollowingIds();
    }
  }, [status, session]);

  if (loading) return <Loading />;

  const handleClick = (index) => {
    setOpenpageId(index);
  };

  const changeComponent = (header) => {
    setActiveComponent(header);
  };

  return (
    <>
      <div className="flex items-center lg:justify-center flex-row flex-wrap md:py-0 lg:mx-8 w-full">
        <div className="bg-gray-100 p-2 mx-2 md:max-w-[1100px] rounded-md flex w-full my-5">
          <div
            onClick={() => changeComponent("Takip ettiklerim")}
            className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
              activeComponent === "Takip ettiklerim"
                ? "bg-premiumOrange shadow-xl text-white"
                : "text-gray-500"
            }`}
          >
            <FaUserFriends className="mr-1 text-base" />
            Takip ettiklerim
          </div>
          <div
            onClick={() => changeComponent("Keşfet")}
            className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
              activeComponent === "Keşfet"
                ? "bg-premiumOrange shadow-xl text-white"
                : "text-gray-500"
            }`}
          >
            <FaRegCompass className="mr-1 text-base" />
            Keşfet
          </div>
          <div
            onClick={() => changeComponent("Kaydedilenler")}
            className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
              activeComponent === "Kaydedilenler"
                ? "bg-premiumOrange shadow-xl text-white"
                : "text-gray-500"
            }`}
          >
            <FaRegSave className="mr-1 text-base" />
            Kaydedilenler
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:mx-auto relative overflow-x-hidden overflow-hidden md:max-w-[1200px] md:h-[88vh]">
        <div className="overflow-y-auto">
          <div className="flex justify-center flex-wrap gap-4">
            {activeComponent === "Takip ettiklerim" && (
              <HorizontalSocial
                usersData={users}
                setUsersData={setUsers}
                mainPosts={followPosts}
                setMainPosts={setPosts}
              />
            )}
            {activeComponent === "Kaydedilenler" &&
              savedPosts.map((post, index) => (
                <button
                  key={index}
                  className="relative group w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                  onClick={() => handleClick(index)}
                >
                  <Image
                    src={post.image_url}
                    className="w-full h-full md:h-full xl:h-full cursor-pointer object-cover"
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
                      className="absolute top-2 right-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                    />
                  )}
                  <div className="absolute hidden justify-center items-center w-full h-full top-0 left-0 font-semibold md:text-desktop text-white group-hover:flex">
                    click to view
                  </div>
                </button>
              ))}
            {activeComponent === "Keşfet" &&
              posts.map((post, index) => (
                <button
                  key={index}
                  className="relative group w-[130px] h-[130px] md:w-[250px] md:h-[250px]"
                  onClick={() => handleClick(index)}
                >
                  <Image
                    src={post.image_url}
                    className="w-full h-full md:h-full xl:h-full cursor-pointer object-cover"
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
                      className="absolute top-2 right-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                    />
                  )}
                  <div className="absolute hidden justify-center items-center w-full h-full top-0 left-0 font-semibold md:text-desktop text-white group-hover:flex">
                    click to view
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
      {setOpenpageId && (
        <HorizontalCarousel
          usersData={users}
          setUsersData={setUsers}
          mainPosts={posts}
          openPageId={openPageId}
          setOpenpageId={setOpenpageId}
          setMainPosts={setPosts}
        />
      )}
    </>
  );
}
