"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function AdsComponent() {
  const [categories, setCategories] = useState([
    "all",
    "art",
    "books",
    "fashion",
    "food",
    "health",
    "memories",
    "music",
    "nature",
    "pets",
    "travel",
  ]);

  const handleCategory = (category) => {
    if (category.toLowerCase() == "all") {
      setUpdatePosts(posts);
    } else {
      setUpdatePosts(posts.filter((post) => post.category == category));
    }
  };

  const handleClick = (index) => {
    setOpenpageId(index);
  };

  useEffect(() => {
    const uniqueCategories = new Set(categories); // Kategorileri benzersiz hale getirir

    posts?.forEach((post) => {
      if (!uniqueCategories.has(post.category)) {
        uniqueCategories.add(post.category);
      }
    });

    setCategories(Array.from(uniqueCategories)); // Seti tekrar diziye çevirip state'i günceller
  }, [posts]);

  useEffect(() => {
    const textShadow = "[text-shadow:1px_1px_2px_rgba(0,255,68,0.6)]";
    document.querySelector("#all").parentElement.childNodes.forEach((node) => {
      node.classList?.remove("border-b-2");
      node.classList?.remove(textShadow);
      node?.classList.add("scale-105");
    });
    if (updatePosts.length == posts.length) {
      document.querySelector(`#all`)?.classList.add("border-b-2");
      document.querySelector(`#all`)?.classList.add(textShadow);
    } else {
      document
        .querySelector(`#${updatePosts[0]?.category}`)
        ?.classList.add("border-b-2");
      document
        .querySelector(`#${updatePosts[0]?.category}`)
        ?.classList.add(textShadow);
      document
        .querySelector(`#${updatePosts[0]?.category}`)
        ?.classList.add("scale-105");
    }
  }, [updatePosts]);

  return (
    <div className="flex flex-col gap-5 py-5 relative overflow-x-hidden  overflow-hidden h-[79vh]">
      <div className="text-center w-full flex flex-row flex-wrap justify-center ">
        {categories?.sort().map((category, index) => (
          <button
            id={category}
            key={index}
            onClick={() => handleCategory(category)}
            className="px-2 [text-shadow:1px_1px_2px_rgba(0,0,0,0.6)]"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex justify-center  h-full w-full">
        <div className="w-full md:w-10/12 mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="">
              {posts.map((post, index) =>
                updatePosts.map(
                  (updatePost) =>
                    updatePost == post && (
                      <CarouselItem
                        key={index}
                        className=" basis-3/4 sm:basis-2/3 md:basis-1/2 lg:basis-1/2"
                      >
                        <div
                          className={` bg-primary rounded-lg  h-fit sm:h-full`}
                        >
                          <CarouselCardHeader
                            post={post}
                            usersData={usersData}
                            setUsersData={setUsersData}
                          />
                          {/* tıklandığında horizontal carousel açılacak */}
                          <button
                            className="relative group w-full h-fit"
                            onClick={() => handleClick(index)}
                          >
                            <Image
                              src={post.image_url}
                              className=" w-full h-full md:h-full xl:h-full cursor-pointer  lg:rounded-md"
                              alt="Picture of the author"
                              width={700}
                              height={700}
                              loading="lazy"
                              id={index}
                              draggable={false}
                              onDoubleClick={() => handleLiked(index)}
                            />
                            {post.video_url && (
                              <MdOutlineVideoLibrary
                                size={30}
                                className=" absolute top-2 right-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] group-hover:drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]"
                              />
                            )}
                            <div className="absolute hidden  justify-center items-center w-full h-full top-0 left-0 font-semibold md:text-desktop text-white group-hover:flex">
                              click to view
                            </div>
                          </button>
                        </div>
                      </CarouselItem>
                    )
                )
              )}
            </CarouselContent>
            <CarouselPrevious className="flex 2xl:scale-125" />
            <CarouselNext className="flex 2xl:scale-125" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default AdsComponent;
