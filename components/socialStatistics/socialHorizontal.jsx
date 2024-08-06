"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  BiHeart,
  BiBookmark,
  BiComment,
  BiShare,
  BiSolidBookmark,
} from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import CarouselCardHeader from "../tabsSocialComponents/carouselCardHeader";
import VideoPlayer from "../tabsSocialComponents/videoPlayer";
import CommentForm from "../tabsSocialComponents/commentForm";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useSession } from "next-auth/react";
import SocialImage from "../tabsSocialComponents/socialImage";
import axios from "axios";
import Swal from "sweetalert2";

function HorizontalSocial({ mainPosts, setMainPosts }) {
  const [openFullCaption, setOpenFullCaption] = useState(undefined);
  const [openCommentPage, setOpenCommentPage] = useState(undefined);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [liked, setLiked] = useState(undefined);
  const openCarouselRef = useRef(null);
  const commentRef = useRef(null);
  const popoverRef = useRef(null);
  const dialogContentRef = useRef(null);
  const isMobile = useMediaQuery(1024);

  const handleClose = () => {
    setOpenCommentPage(null);
    setOpenFullCaption(undefined);
  };
  const [savedPosts, setSavedPosts] = useState([]);
  const { data: session } = useSession();
  const userId = session?.user.id;
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(`/api/profile/${userId}/get-info`);
        const { savedPosts } = response.data;
        console.log(savedPosts);
        setSavedPosts(savedPosts.map((post) => post.id));
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, []);
  const handleSave = async (index) => {
    const post = mainPosts[index];
    const isCurrentlySaved = savedPosts.includes(post.id);

    try {
      const response = await axios.put("/api/savePost", {
        userId: userId,
        postId: post.id,
        isSaved: isCurrentlySaved,
      });
      console.log(response.data.message);

      if (response.data.message === "saved") {
        Swal.fire({
          icon: "success",
          title: "Post başarılı bir şekilde kaydedildi",
          showConfirmButton: false,
          timer: 2000,
        });

        // Update the savedPosts state
        setSavedPosts((prev) => [...prev, post.id]);
      } else if (response.data.message === "removed") {
        Swal.fire({
          icon: "success",
          title: "Post kaydedilenlerden kaldırıldı.",
          showConfirmButton: false,
          timer: 2000,
        });

        // Update the savedPosts state
        setSavedPosts((prev) => prev.filter((id) => id !== post.id));
      }
    } catch (error) {
      console.error("Error updating saved post:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleLiked = (index) => {
    if (mainPosts[index]?.isLiked == false) {
      setLiked(index);
    }

    // Beğeni animasyonunu geri almak için bir süre bekleyebilirsiniz.
    setTimeout(() => {
      setLiked(undefined);
    }, 1000);
    setMainPosts(
      mainPosts.map((post, i) =>
        i === index ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !(
          dialogContentRef.current &&
          dialogContentRef.current.contains(e.target)
        ) &&
        !(
          dialogContentRef.current &&
          !dialogContentRef.current.contains(e.target)
        ) &&
        !(popoverRef.current && popoverRef.current.contains(e.target)) &&
        openCarouselRef.current &&
        !openCarouselRef.current.contains(e.target)
      ) {
        if (openCommentPage == undefined && openCommentPage == null) {
          handleClose();
        }
      }
    };
    const closeCommentPage = (e) => {
      if (
        (openCommentPage != null || openCommentPage != undefined) &&
        commentRef.current &&
        !commentRef.current.contains(e.target)
      ) {
        setOpenCommentPage(undefined);
      }
    };

    // Event listener'ı ekleyin
    document.addEventListener("mousedown", handleOutsideClick);
    document?.addEventListener("mousedown", closeCommentPage);
    // Temizlik işlemi
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document?.removeEventListener("mousedown", closeCommentPage);
    };
  }, [handleClose]);

  const handleFocus = (index) => {
    document?.querySelectorAll(".commentInput")[index]?.focus();
  };

  const timeStamp = (targetDate) => {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);
    const differenceInMilliseconds = currentDate - targetDateTime;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    return differenceInDays >= 1
      ? `${Math.floor(differenceInDays)} gün önce`
      : differenceInHours >= 1
      ? `${Math.floor(differenceInHours)} saat önce`
      : differenceInMinutes >= 1
      ? `${Math.floor(differenceInMinutes)} dakika önce`
      : differenceInSeconds >= 1
      ? `${Math.floor(differenceInSeconds)} saniye önce`
      : "az önce";
  };

  return (
    <>
      <div
        className={`w-full  flex justify-center items-end md:items-center h-full`}
      >
        <div
          id="openCarousel"
          className="w-full relative lg:rounded-lg sm:mt-0"
          ref={openCarouselRef}
        >
          <div
            className={` flex flex-col overflow-y-auto lg:gap-6 w-full h-full mt-0 md:-mt-1`}
          >
            {mainPosts.map((post, index) => (
              <div key={index} className={` pt-1 basis-1 relative h-full lg:`}>
                <div
                  className={`lg:grid grid-cols-2   bg-primary rounded-lg h-fit  `}
                >
                  <CarouselCardHeader
                    options={1}
                    post={post}
                    openCommentPage={openCommentPage}
                    openCarouselRef={openCarouselRef}
                    type={"horizontalPage"}
                    popoverRef={popoverRef}
                    dialogContentRef={dialogContentRef}
                    className={
                      "h-fit flex col-start-2 lg:border-b md:items-center px-4 xl:px-5"
                    }
                  />
                  <div
                    className={`post flex items-center relative row-span-3 row-start-1  lg:rounded-lg `}
                    id={index}
                  >
                    {post.video_url ? (
                      <VideoPlayer
                        url={post.video_url}
                        index={index}
                        handleLiked={handleLiked}
                        loading="lazy"
                        isVideoMuted={isVideoMuted}
                        setIsVideoMuted={setIsVideoMuted}
                      />
                    ) : (
                      <SocialImage
                        post={post}
                        index={index}
                        handleLiked={handleLiked}
                      />
                    )}
                    <AiFillHeart
                      className={`
                                            ${
                                              liked == index
                                                ? "scale-[10]"
                                                : "scale-0"
                                            }
                                            absolute
                                            transition-all
                                            duration-300 
                                            top-1/2 left-1/2
                                            transform
                                            -translate-x-1/2
                                            -translate-y-1/2
                                            text-red-600
                                            opacity-80
                                            `}
                    />
                  </div>
                  <div className="hidden lg:flex flex-col px-4 xl:px-5 py-4 border-b  overflow-x-hidden overflow-y-auto col-start-2 ">
                    <div className="">
                      <div className={`h-fit`} id={post.comments[0]?.id}>
                        <span className="mr-2 text-white">{post.username}</span>
                        <span className={`text-white/80 whitespace-wrap`}>
                          {post.caption.length <= 100 ? (
                            post.caption
                          ) : openFullCaption == index ? (
                            post.caption
                          ) : (
                            <>
                              <span>{post.caption.slice(0, 90)}... </span>
                              <span
                                onClick={() => {
                                  setOpenFullCaption(index);
                                }}
                                className="text-cyan-200 hover:text-cyan-400 cursor-pointer"
                              >
                                devamını gör
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 mt-2 text-white">
                      {post.comments != 0 ? (
                        post.comments.map((comment, index) => (
                          <div key={index} className="mt-2  ">
                            <span>{comment.username}</span>{" "}
                            <span className="text-white/80 max-w-[300px] h-fit whitespace-wrap">
                              {comment.comment}{" "}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center">No comment yet.</div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-white h-fit py-2 col-start-2 col-span-1 ">
                    <div className="flex justify-between xl:text-xl 2xl:text-2xl px-2 ">
                      <div className="flex gap-3 ">
                        <button
                          className="cursor-pointer active:scale-90 transition-all duration-150"
                          onClick={() => handleLiked(index)}
                        >
                          {post.isLiked ? (
                            <AiFillHeart
                              className="md:stroke-1 stroke-red-500  text-red-500"
                              size={24}
                            />
                          ) : (
                            <BiHeart className="md:stroke-1" size={24} />
                          )}
                        </button>
                        <button
                          className="cursor-pointer active:scale-90"
                          onClick={() => {
                            isMobile && setOpenCommentPage(index);
                            handleFocus(index);
                          }}
                        >
                          <BiComment className="md:stroke-1" size={24} />
                        </button>
                        <button className="cursor-pointer active:scale-90">
                          <BiShare className="md:stroke-1" size={24} />
                        </button>
                      </div>
                      <div>
                        <button
                          className="cursor-pointer active:scale-90"
                          onClick={() => handleSave(index)}
                        >
                          {post.saveBook ? (
                            <BiSolidBookmark
                              className="md:stroke-1"
                              size={24}
                            />
                          ) : (
                            <BiBookmark className="md:stroke-1" size={24} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="text-white px-2">
                      <span>{post.likes} beğenme,</span>{" "}
                      <button
                        onClick={() => {
                          setOpenCommentPage(index);
                          handleFocus(index);
                        }}
                      >
                        {post.comments.length} yorum
                      </button>
                    </div>
                    <div
                      className={`block lg:hidden h-fit px-2`}
                      id={post.comments[0]?.id}
                    >
                      <span className="mr-2">{post.username}</span>
                      <span className={`text-white/80 whitespace-wrap`}>
                        {openFullCaption == index ? (
                          post.caption
                        ) : (
                          <>
                            <span>{post.caption.slice(0, 18)}... </span>
                            <span
                              onClick={() => {
                                setOpenFullCaption(index);
                              }}
                              className="text-cyan-200 hover:text-cyan-400 cursor-pointer"
                            >
                              devamını gör
                            </span>
                          </>
                        )}{" "}
                      </span>
                    </div>
                    <div className="text-white px-2">
                      {timeStamp(post.timestamp)}
                    </div>
                    <div className="hidden lg:block border-t">
                      <CommentForm
                        posts={mainPosts}
                        index={index}
                        setMainPosts={setMainPosts}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isMobile && (
          <div
            className={`${
              openCommentPage != undefined && isMobile
                ? "flex lg:hidden backdrop-blur-[2px]  "
                : "hidden"
            } z-[999] flex-col absolute justify-center  items-center  w-full  h-screen text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          >
            <div
              ref={commentRef}
              className="relative bg-black w-10/12 rounded-md max-w-[400px]"
            >
              <div className="flex justify-between p-3 border-b border-input items-center">
                <span>{mainPosts[openCommentPage]?.comments.length} yorum</span>
                <button
                  className="
                        border
                        border-input
                        text-black
                        bg-background
                        hover:bg-accent
                        hover:text-accent-foreground
                        w-8 h-8
                        rounded-full
                        "
                  onClick={() => {
                    setOpenCommentPage(undefined);
                  }}
                >
                  X
                </button>
              </div>
              <div
                className={`flex flex-col px-3 overflow-y-auto overflow-x-hidden max-h-[400px] `}
              >
                {mainPosts[openCommentPage]?.comments.length != 0 ? (
                  mainPosts[openCommentPage]?.comments.map((comment, index) => (
                    <div key={index} className="mt-2  ">
                      <span>{comment.username}</span>{" "}
                      <span className="text-white/80 max-w-[300px] h-fit whitespace-wrap">
                        {comment.comment}{" "}
                      </span>
                    </div>
                  ))
                ) : (
                  <span>hiç yorum yok.</span>
                )}
              </div>
              <div>
                <CommentForm
                  posts={mainPosts}
                  index={openCommentPage}
                  setMainPosts={setMainPosts}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HorizontalSocial;
