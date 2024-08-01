"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { FaPlus } from "react-icons/fa6";
import { useProfileStore } from "@/store/useProfileStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSession } from "next-auth/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import InfoBoxTotal from "./infoBoxTotal";
import AddPostComp from "../tabsSocialComponents/AddPostComp";

export default function SocialArea() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const isMobile = useMediaQuery(768);
  const setOpenpageId = useProfileStore((state) => state.setOpenpageId);
  const setOpenAddPost = useProfileStore((state) => state.setOpenAddPost);
  const openAddPost = useProfileStore((state) => state.openAddPost);

  useEffect(() => {
    if (status === "loading") {
      // Session is being loaded, show a loading state or similar
      return;
    }

    if (status === "authenticated") {
      const userID = session.user.id;

      const fetchPosts = async () => {
        try {
          const response = await fetch("/api/post");
          const allPosts = await response.json();
          const filteredPosts = allPosts.filter(
            (post) => post.userID === userID
          );
          setPosts(filteredPosts);
        } catch (error) {
          console.error("Failed to fetch posts", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [status, session]);

  if (loading) return <Loading />;

  const handleClick = (index) => {
    setOpenpageId(index);
  };

  const boxesTotal = [
    {
      number: 58,
      title: "TOPLAM GÖNDERİ",
      description: "Toplam gönderiyi gösterir.",
    },
    {
      number: 950,
      title: "TOPLAM GÖRÜNTÜLENME",
      description: "Toplam görüntülenmeyi gösterir.",
    },
    {
      number: 473,
      title: "TOPLAM BEĞENİ",
      description: "Toplam beğeni sayısını gösterir.",
    },
    {
      number: 3775,
      title: "TOPLAM YORUM",
      description: "Toplam yorumu gösterir.",
    },
    {
      number: 607,
      title: "TOPLAM PAYLAŞIM",
      description: "Toplam paylaşım sayısını gösterir.",
    },
    {
      number: 607,
      title: "TOPLAM KAYDETME",
      description: "Toplam kaydetme sayısını gösterir.",
    },
  ];

  const renderSwiperTotalInfos = (items) => {
    const itemsPerSlide = isMobile ? 6 : 10;
    const swiperSlides = [];

    for (let i = 0; i < items.length; i += itemsPerSlide) {
      const currentTimes = items.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center">
            {currentTimes.map((box, index) => (
              <InfoBoxTotal
                key={index}
                number={box.number}
                title={box.title}
                description={box.description}
              />
            ))}
          </div>
        </SwiperSlide>
      );
      swiperSlides.push(swiperSlide);
    }

    return (
      <Swiper
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {swiperSlides}
      </Swiper>
    );
  };

  return (
    <>
      <div className="flex mx-5 items-center py-3 lg:py-0 lg:px-5 lg:justify-center flex-row flex-wrap lg:mx-5">
        <div className="statisticArea flex lg:flex-row flex-col w-full bg-gray-100 rounded-xl py-3">
          <div className="totalStatistics lg:w-[90%]">
            {renderSwiperTotalInfos(boxesTotal)}
          </div>
          <button
            onClick={() => {
              setOpenAddPost(true);
            }}
            type="button"
            className="flex items-center gap-2 font-semibold px-3 md:px-5 h-[5.5vw] my-auto rounded-xl transition-colors duration-150 bg-white border-2 border-premiumOrange text-premiumOrange hover:bg-premiumOrange hover:text-white lg:text-[0.9vw] lg:mr-5 max-[768px]:py-5 max-[768px]:my-2 max-[768px]:mx-5 max-[768px]:text-sm max-[768px]:justify-center"
          >
            <span>Gönderi Oluştur</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 pb-5 relative overflow-x-hidden  overflow-hidden  md:h-[calc(100vh_-_302px)] mt-10 lg:mx-5">
        <div className=" overflow-y-auto ">
          <div className="flex justify-center flex-wrap gap-4">
            {posts.map((post, index) => (
              <button
                key={index}
                className="relative group w-[100px] h-[100px]  md:w-[250px] md:h-[250px]"
                onClick={() => handleClick(index)}
              >
                <Image
                  src={post.image_url}
                  className=" w-full h-full md:h-full xl:h-full cursor-pointer object-cover"
                  alt="Picture of the author"
                  width={isMobile ? 150 : 700}
                  height={isMobile ? 150 : 700}
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
      {openAddPost && <AddPostComp openAddPost={openAddPost} />}
    </>
  );
}
