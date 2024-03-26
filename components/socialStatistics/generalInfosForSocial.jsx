"use client";
import React, { useEffect, useState } from "react";
import InfoBox from "./infoBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

function GeneralInfosForSocial() {
  const isMobile = useMediaQuery(1024);
  Chart.register(...registerables);
  Chart.register(CategoryScale);
  const [currentDate, setCurrentDate] = useState(new Date());

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
        type: "line",
        label: "Günlük Görüntülenme",
        data: [652, 856, 112, 314, 796, 113, 932],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Hafta Günlük Görüntülenme",
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
        type: "line",
        label: "Günlük Beğeni",
        data: [138, 85, 112, 31, 96, 113, 32],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Hafta Günlük Beğeni",
        data: [34, 54, 95, 114, 36, 74, 114],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const stateTodayView = {
    //BUGÜNKÜ Görüntülenme SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: hoursArray,
    datasets: [
      {
        type: "bar",
        label: "Bugünkü Görüntülenme",
        data: [
          12, 56, 14, 36, 46, 16, 96, 47, 63, 46, 64, 32, 19, 14, 40, 49, 13,
          66, 14, 60, 40, 79, 12, 16,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Dünkü Görüntülenme",
        data: [
          19, 64, 53, 31, 53, 16, 54, 65, 69, 15, 46, 37, 7, 46, 49, 39, 31, 46,
          14, 46, 76, 16, 18, 16,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const stateTodayLike = {
    //BUGÜNKÜ like SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: hoursArray,
    datasets: [
      {
        type: "bar",
        label: "Bugünkü Beğenme",
        data: [
          4, 14, 14, 32, 18, 11, 26, 17, 23, 36, 14, 22, 19, 17, 26, 19, 14, 16,
          34, 26, 24, 19, 12, 16,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Dünkü Beğenme",
        data: [
          14, 13, 7, 24, 23, 17, 16, 27, 33, 26, 16, 22, 23, 18, 1, 16, 8, 17,
          16, 32, 14, 6, 3, 13,
        ],
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

  const stateYearlyView = {
    //YILLIK görüntülenme SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: months,
    datasets: [
      {
        type: "line",
        label: "Bu Yıl Görüntülenme",
        data: [
          1365, 1580, 3122, 5491, 1678, 2160, 5496, 4645, 1269, 2110, 7157,
          8883,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Yıl Görüntülenme",
        data: [
          2165, 3120, 1582, 1591, 1138, 3160, 4196, 6145, 6129, 9770, 2127,
          1143,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const stateYearlyLike = {
    //YILLIK beğenme SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: months,
    datasets: [
      {
        type: "line",
        label: "Bu Yıl Beğenme",
        data: [165, 180, 322, 541, 178, 260, 496, 465, 269, 210, 157, 883],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
        label: "Geçen Yıl Beğenme",
        data: [215, 320, 582, 191, 138, 160, 196, 545, 629, 970, 1127, 243],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const stateMonthlyView = {
    labels: daysInMonth,
    datasets: [
      {
        type: "line",
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
        type: "line",
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
        type: "line",
        label: "Bu Ay Beğenme",
        data: [
          32, 48, 26, 58, 64, 78, 31, 46, 35, 33, 48, 43, 23, 56, 94, 71, 13,
          51, 48, 33, 53, 43, 31, 55, 61, 76, 45, 48, 48, 85, 31,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "line",
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

  const [graph, setGraph] = useState(stateTodayView);

  const boxes = [
    //İNFO KUTULARINA VERİLERİ GÖNDERDİĞİMİZ ARRAY
    {
      number: 950,
      title: "BU GÜN GÖRÜNTÜLENME",
      lastOne: 926,
      graphType: "dailyView",
      description: "Bu günkü toplam görüntülenmeyi gösterir.",
    },
    {
      number: 473,
      title: "BU GÜN BEĞENİ",
      lastOne: 405,
      graphType: "dailyLike",
      description: "Bu günkü toplam beğeni sayısını gösterir.",
    },
    {
      number: 3775,
      title: "BU HAFTA GÖRÜNTÜLENME",
      lastOne: 4211,
      graphType: "weeklyView",
      description: "Bu haftaki toplam görüntülenmeyi gösterir.",
    },
    {
      number: 607,
      title: "BU HAFTA BEĞENİ",
      lastOne: 521,
      graphType: "weeklyLike",
      description: "Bu haftaki toplam beğeni sayısını gösterir.",
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
      number: 44956,
      title: "BU YIL GÖRÜNTÜLENME",
      lastOne: 42266,
      graphType: "yearlyView",
      description: "Bu yılki toplam görüntülenmeyi gösterir.",
    },
    {
      number: 4126,
      title: "BU YIL BEĞENİ",
      lastOne: 5316,
      graphType: "yearlyLike",
      description: "Bu yılki toplam beğeni sayısını gösterir.",
    },
  ];
  const optionsTodayView = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Saatler", // X ekseni başlığı
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
          text: "Göeüntülenme Sayısı", // Y ekseni başlığı
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
  const optionsTodayLike = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Saatler", // X ekseni başlığı
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
  const optionsYearlyLike = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
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
  const optionsYearlyView = {
    plugins: {
      legend: {
        display: false, // Burada legend'i gizliyoruz
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Aylar", // X ekseni başlığı
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

  const [options, setOptions] = useState(optionsTodayView);
  const changeGraph = (dataType) => {
    if (dataType === "weeklyView") {
      setGraph({ ...stateWeeklyView });
      setOptions(optionsMonthlyView);
    } else if (dataType === "weeklyLike") {
      setGraph({ ...stateWeeklyLike });
      setOptions(optionsMonthlyLike);
    } else if (dataType === "dailyView") {
      setGraph({ ...stateTodayView });
      setOptions(optionsTodayView);
    } else if (dataType === "dailyLike") {
      setGraph({ ...stateTodayLike });
      setOptions(optionsTodayLike);
    } else if (dataType === "monthlyView") {
      setGraph({ ...stateMonthlyView });
      setOptions(optionsMonthlyView);
    } else if (dataType === "monthlyLike") {
      setGraph({ ...stateMonthlyLike });
      setOptions(optionsMonthlyLike);
    } else if (dataType === "yearlyView") {
      setGraph({ ...stateYearlyView });
      setOptions(optionsYearlyView);
    } else if (dataType === "yearlyLike") {
      setGraph({ ...stateYearlyLike });
      setOptions(optionsYearlyLike);
    }
  };

  const renderSwiper = (items) => {
    const itemsPerSlide = isMobile ? 4 : 8;
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
            İstatistikler
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
            <div className="graphArea md:w-full lg:w-[50%] sm:flex block items-center justify-center mb-2 lg:mb-0 max-h-[345px] mt-3">
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
                        <h1 className=" text-premiumOrange text-lg font-semibold ml-3 lg:text-3xl">
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
                              <h1 className=" text-black font-extrabold ml-1">
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
            <div className="infosArea flex items-center justify-end w-full lg:w-[50%] mx-auto">
              {renderSwiper(boxes)}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default GeneralInfosForSocial;
