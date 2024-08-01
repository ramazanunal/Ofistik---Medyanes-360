"use client";
import React, { useEffect, useState } from "react";
import InfoBox from "./infoBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Line } from "react-chartjs-2";
import { useProfileStore } from "@/store/useProfileStore";
import { CategoryScale, Chart, registerables } from "chart.js";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import HorizontalCarousel from "../tabsSocialComponents/HorizontalCarousel";
import { useSession } from "next-auth/react";

function GeneralInfosForSocial() {
  const isMobile = useMediaQuery(1024);
  const { data: session, status } = useSession();
  Chart.register(...registerables);
  Chart.register(CategoryScale);
  const [currentDate, setCurrentDate] = useState(new Date());
  const setOpenpageId = useProfileStore((state) => state.setOpenpageId);

  const [posts, setPosts] = useState([]);
  const setUsers = useProfileStore((state) => state.setUsers);
  const users = useProfileStore((state) => state.users);
  const openPageId = useProfileStore((state) => state.openPageId);
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
        }
      };

      fetchPosts();
    }
  }, [status, session]);
  const gun = currentDate.getDate().toString().padStart(2, "0");
  const ay = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const yil = currentDate.getFullYear();
  const saat = currentDate.getHours().toString().padStart(2, "0");
  const dakika = currentDate.getMinutes().toString().padStart(2, "0");

  const guncelTarih = `${gun}.${ay}.${yil} ${saat}:${dakika}`;

  const hoursArray = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const days = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const stateWeeklyView = {
    //GUNLÜK Görüntülenme SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Bu Hafta Görüntülenme",
        data: [652, 856, 112, 314, 796, 113, 932],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Görüntülenme",
        data: [324, 514, 895, 114, 636, 714, 1014],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const stateWeeklyLike = {
    //GUNLÜK beğeni SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Bu Hafta Beğeni",
        data: [138, 85, 112, 31, 96, 113, 32],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Beğeni",
        data: [34, 54, 95, 114, 36, 74, 114],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const stateWeeklyComment = {
    //haftalık yorum SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Bu Hafta Yorum",
        data: [12, 56, 14, 36, 46, 16, 96],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Yorum",
        data: [19, 64, 53, 31, 53, 16, 54],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const stateWeeklyShare = {
    //haftalık paylaşım SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Bu Hafta Paylaşım",
        data: [5, 56, 16, 36, 88, 16, 66],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Paylaşım",
        data: [19, 64, 41, 31, 53, 34, 28],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const stateWeeklySave = {
    //haftalık kaydetme SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Bu Hafta Kaydetme",
        data: [5, 13, 16, 45, 29, 16, 17],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Kaydetme",
        data: [19, 33, 41, 42, 53, 12, 28],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const daysInMonth = new Array(31).fill().map((_, i) => i + 1);

  const stateMonthlyView = {
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Görüntülenme",
        data: [
          326, 448, 126, 548, 614, 748, 113, 146, 235, 313, 348, 413, 123, 546,
          694, 731, 113, 115, 248, 332, 353, 413, 131, 556, 651, 766, 145, 148,
          248, 385, 331,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Görüntülenme",
        data: [
          448, 548, 113, 376, 764, 842, 313, 415, 286, 135, 346, 113, 543, 295,
          349, 468, 113, 648, 348, 113, 486, 45, 155, 568, 248, 456, 163, 446,
          313, 136, 368,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Görüntülenme Sayısı",
          },
        },
      },
    },
  };
  const stateMonthlyLike = {
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Beğenme",
        data: [
          32, 48, 26, 58, 64, 78, 31, 46, 35, 33, 48, 43, 23, 56, 94, 71, 13,
          51, 48, 33, 53, 43, 31, 55, 61, 76, 45, 48, 48, 85, 31,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Beğenme",
        data: [
          48, 58, 13, 76, 64, 82, 13, 45, 26, 35, 36, 13, 53, 95, 49, 48, 13,
          68, 48, 11, 86, 5, 15, 68, 48, 46, 63, 46, 33, 36, 68,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Görüntülenme Sayısı",
          },
        },
      },
    },
  };
  const stateMonthlyComment = {
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Yorum",
        data: [
          32, 48, 26, 58, 64, 78, 31, 46, 35, 33, 48, 43, 23, 56, 94, 71, 13,
          51, 48, 33, 53, 43, 31, 55, 61, 76, 45, 48, 48, 85, 31,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Yorum",
        data: [
          48, 58, 13, 76, 64, 82, 13, 45, 26, 35, 36, 13, 53, 95, 49, 48, 13,
          68, 48, 11, 86, 5, 15, 68, 48, 46, 63, 46, 33, 36, 68,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Yorum Sayısı",
          },
        },
      },
    },
  };
  const stateMonthlyShare = {
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Paylaşım",
        data: [
          32, 48, 26, 58, 64, 78, 31, 46, 35, 33, 48, 43, 23, 56, 94, 71, 13,
          51, 48, 33, 53, 43, 31, 55, 61, 76, 45, 48, 48, 85, 31,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Paylaşım",
        data: [
          48, 58, 13, 76, 64, 82, 13, 45, 26, 35, 36, 13, 53, 95, 49, 48, 13,
          68, 48, 11, 86, 5, 15, 68, 48, 46, 63, 46, 33, 36, 68,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Paylaşım Sayısı",
          },
        },
      },
    },
  };
  const stateMonthlySave = {
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Kaydetme",
        data: [
          32, 48, 26, 58, 64, 78, 31, 46, 35, 33, 48, 43, 23, 56, 94, 71, 13,
          51, 48, 33, 53, 43, 31, 55, 61, 76, 45, 48, 48, 85, 31,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Kaydetme",
        data: [
          48, 58, 13, 76, 64, 82, 13, 45, 26, 35, 36, 13, 53, 95, 49, 48, 13,
          68, 48, 11, 86, 5, 15, 68, 48, 46, 63, 46, 33, 36, 68,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Günler",
          },
        },
        y: {
          title: {
            display: true,
            text: "Kaydetme Sayısı",
          },
        },
      },
    },
  };

  const [graph, setGraph] = useState(stateWeeklyView);

  const boxes = [
    //İNFO KUTULARINA VERİLERİ GÖNDERDİĞİMİZ ARRAY
    {
      number: 950,
      title: "BU HAFTA GÖRÜNTÜLENME",
      lastOne: 926,
      graphType: "weeklyView",
      description: "Bu haftaki toplam görüntülenmeyi gösterir.",
    },
    {
      number: 473,
      title: "BU HAFTA BEĞENİ",
      lastOne: 405,
      graphType: "weeklyLike",
      description: "Bu haftaki toplam beğeni sayısını gösterir.",
    },
    {
      number: 3775,
      title: "BU HAFTA YORUM",
      lastOne: 4211,
      graphType: "weeklyComment",
      description: "Bu haftaki toplam yorumu gösterir.",
    },
    {
      number: 607,
      title: "BU HAFTA PAYLAŞIM",
      lastOne: 521,
      graphType: "weeklyShare",
      description: "Bu haftaki toplam paylaşım sayısını gösterir.",
    },
    {
      number: 607,
      title: "BU HAFTA KAYDETME",
      lastOne: 521,
      graphType: "weeklySave",
      description: "Bu haftaki toplam kaydetme sayısını gösterir.",
    },
    {
      number: 11407,
      title: "BU AY GÖRÜNTÜLENME",
      lastOne: 10960,
      graphType: "monthlyView",
      description: "Bu ayki toplam görüntülenmeyi gösterir.",
    },
    {
      number: 1507,
      title: "BU AY BEĞENİ",
      lastOne: 1408,
      graphType: "monthlyLike",
      description: "Bu ayki toplam beğeni sayısını gösterir.",
    },
    {
      number: 1507,
      title: "BU AY YORUM",
      lastOne: 1408,
      graphType: "monthlyComment",
      description: "Bu ayki toplam yorum sayısını gösterir.",
    },
    {
      number: 1507,
      title: "BU AY PAYLAŞIM",
      lastOne: 1408,
      graphType: "monthlyShare",
      description: "Bu ayki toplam paylaşım sayısını gösterir.",
    },
    {
      number: 1507,
      title: "BU AY KAYDETME",
      lastOne: 1408,
      graphType: "monthlySave",
      description: "Bu ayki toplam kaydetme sayısını gösterir.",
    },
  ];

  const optionsMonthlyView = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Görüntülenme Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsMonthlyLike = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Beğenme Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsMonthlyComment = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Yorum Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsMonthlyShare = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Paylaşım Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const optionsMonthlySave = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Günler", // X ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Kaydetme Sayısı", // Y ekseni başlığı
          color: "#000", // Başlık rengi
          font: {
            size: 14, // Başlık yazı boyutu
            weight: "medium", // Başlık yazı kalınlığı
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", // Başlık yazı tipi
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const [options, setOptions] = useState(optionsMonthlyView);
  const changeGraph = (dataType) => {
    if (dataType === "weeklyView") {
      setGraph({ ...stateWeeklyView });
      setOptions(optionsMonthlyView);
    } else if (dataType === "weeklyLike") {
      setGraph({ ...stateWeeklyLike });
      setOptions(optionsMonthlyLike);
    } else if (dataType === "weeklyComment") {
      setGraph({ ...stateWeeklyComment });
      setOptions(optionsMonthlyComment);
    } else if (dataType === "weeklyShare") {
      setGraph({ ...stateWeeklyShare });
      setOptions(optionsMonthlyShare);
    } else if (dataType === "weeklySave") {
      setGraph({ ...stateWeeklySave });
      setOptions(optionsMonthlySave);
    } else if (dataType === "monthlyLike") {
      setGraph({ ...stateMonthlyLike });
      setOptions(optionsMonthlyLike);
    } else if (dataType === "monthlyView") {
      setGraph({ ...stateMonthlyView });
      setOptions(optionsMonthlyView);
    } else if (dataType === "monthlyComment") {
      setGraph({ ...stateMonthlyComment });
      setOptions(optionsMonthlyComment);
    } else if (dataType === "monthlyShare") {
      setGraph({ ...stateMonthlyShare });
      setOptions(optionsMonthlyShare);
    } else if (dataType === "monthlySave") {
      setGraph({ ...stateMonthlySave });
      setOptions(optionsMonthlySave);
    }
  };

  const renderSwiper = (items) => {
    const itemsPerSlide = isMobile ? 4 : 10;
    const swiperSlides = [];

    for (let i = 0; i < items.length; i += itemsPerSlide) {
      const currentTimes = items.slice(i, i + itemsPerSlide);
      const swiperSlide = (
        <SwiperSlide key={i}>
          <div className="flex flex-wrap items-center justify-center">
            {currentTimes.map((box, index) => (
              <InfoBox
                key={index}
                number={box.number}
                title={box.title}
                changeRate={box.changeRate}
                lastOne={box.lastOne}
                graph={box.graph}
                description={box.description}
                changeGraph={() => changeGraph(box.graphType)}
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
      <div className=" lg:mx-10 lg:pb-3 lg:mb-4 my-3 mx-auto lg:my-0 bg-white  rounded-lg max-[768px]:max-w-[370px]">
        <div className="mx-4 block lg:flex items-center justify-center lg:justify-between">
          <h1 className="lg:text-[1.5vw] max-[768px]:text-xl font-semibold text-gray-600 pl-3 pt-4 text-center">
            Sosyal İstatistikleri
          </h1>
          {!isMobile && (
            <div className="block lg:flex items-center justify-center">
              <h1 className="text-xs lg:text-[0.8vw] text-gray-500 font-semibold flex items-center justify-center pt-4">
                Son Güncelleme : {guncelTarih}
              </h1>
            </div>
          )}
        </div>
        <div className="infosArea block lg:flex  rounded-md">
          <>
            <div className="graphArea md:w-full lg:w-[40%] sm:flex block items-center justify-center mb-2 lg:mb-0 max-h-[345px] mt-3">
              <div className="lg:w-full h-full flex flex-col items-center justify-center lg:justify-start mr-1 ">
                <div className="titleArea ml-5 flex lg:mx-0 lg:ml-14 lg:justify-start items-center w-full text-xs lg:text-[0.8vw] ">
                  <div className="flex justify-between w-full">
                    <div className="flex mb-2 lg:text-[1vw] items-center justify-center my-auto">
                      <div className="block">
                        <h1 className=" text-gray-500 font-semibold flex items-center justify-center">
                          {graph.datasets[0].label} :
                        </h1>
                        <div className="flex">
                          {graph &&
                            graph.datasets &&
                            graph.datasets[1] &&
                            graph.datasets[1].label &&
                            graph.datasets[1].data && (
                              <>
                                <div className="flex mt-2 ">
                                  <div className="changePercentage text-gray-500 font-semibold flex items-center justify-center ">
                                    {" "}
                                    {(
                                      ((graph.datasets[0].data.reduce(
                                        (acc, currentValue) =>
                                          acc + currentValue,
                                        0
                                      ) -
                                        graph.datasets[1].data.reduce(
                                          (acc, currentValue) =>
                                            acc + currentValue,
                                          0
                                        )) /
                                        graph.datasets[1].data.reduce(
                                          (acc, currentValue) =>
                                            acc + currentValue,
                                          0
                                        )) *
                                      100
                                    ).toFixed(2)}
                                    %{" "}
                                    {graph.datasets[0].data.reduce(
                                      (acc, currentValue) => acc + currentValue,
                                      0
                                    ) >
                                    graph.datasets[1].data.reduce(
                                      (acc, currentValue) => acc + currentValue,
                                      0
                                    ) ? (
                                      <FaArrowTrendUp className=" text-green-600 text-2xl ml-3 font-bold " />
                                    ) : (
                                      <FaArrowTrendDown className=" text-red-600 text-2xl ml-3 font-bold " />
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                      <div className="h-full mb-auto">
                        <h1 className=" text-premiumOrange text-base font-semibold ml-3 lg:text-[1.4vw]">
                          {graph.datasets[0].data.reduce(
                            (acc, currentValue) => acc + currentValue,
                            0
                          )}{" "}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between mr-5 my-auto">
                      {graph &&
                        graph.datasets &&
                        graph.datasets[1] &&
                        graph.datasets[1].label &&
                        graph.datasets[1].data && (
                          <>
                            <div className="flex  oldValues lg:text-[0.9vw]">
                              <h1 className=" text-gray-500 font-semibold">
                                {graph.datasets[1].label} :
                              </h1>
                              <h1 className=" text-black font-semibold ml-1">
                                {graph.datasets[1].data.reduce(
                                  (acc, currentValue) => acc + currentValue,
                                  0
                                )}{" "}
                              </h1>
                            </div>
                          </>
                        )}
                      <div className="lg:text-[0.7vw]">
                        <div className="firstOne flex my-1">
                          <div className="lg:w-[0.7vw] lg:h-[0.7vw] w-[2.7vw] h-[2.7vw] bg-premiumOrange my-auto flex items-center justify-center rounded-full mr-2"></div>
                          <h1 className=" text-premiumOrange font-semibold text-center flex items-center justify-center ">
                            {graph.datasets[0].label}
                          </h1>
                        </div>
                        <div className="secondOne flex">
                          {graph &&
                            graph.datasets &&
                            graph.datasets[1] &&
                            graph.datasets[1].label &&
                            graph.datasets[1].data && (
                              <>
                                <div className="lg:w-[0.7vw] lg:h-[0.7vw] w-[2.7vw] h-[2.7vw] bg-gray-500 flex my-auto items-center justify-center rounded-full mr-2"></div>
                                <h1 className=" text-gray-500 font-semibold text-center flex items-center justify-center ">
                                  {graph.datasets[1].label}
                                </h1>
                              </>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Line data={graph} options={options} className="lg:pb-10" />
              </div>
            </div>
            {isMobile && (
              <div className="flex items-center justify-center">
                <div className="flex flex-col justify-center items-center mx-auto w-1/2">
                  <h1 className="text-xs lg:text-[0.8vw] text-gray-500 font-semibold flex items-center justify-center pt-2">
                    Son Güncelleme
                  </h1>
                  <h1 className="text-xs lg:text-[0.8vw] text-gray-500 font-semibold flex items-center justify-center">
                    {guncelTarih}
                  </h1>
                </div>
              </div>
            )}
            <div className="infosArea flex items-center justify-end w-full lg:w-[60%] mx-auto">
              {renderSwiper(boxes)}
            </div>
          </>
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

export default GeneralInfosForSocial;
