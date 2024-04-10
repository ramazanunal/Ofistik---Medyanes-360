"use client";

import React, { useEffect, useState } from "react";
import InfoBoxFinance from "./infoBoxFinance";
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

function FinanceStatistics() {
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
  const dailyEarn = {
    //GUNLÜK KAZANÇ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Günlük Kazanç",
        data: [535, 840, 120, 330, 775, 165, 990],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Günlük Kazanç",
        data: [392, 586, 815, 155, 620, 420, 100],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const monthlyEarn = {
    //YILLIK KAZANÇ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: months,
    datasets: [
      {
        type: "bar",
        label: "Bu Yıl Kazanç",
        data: [
          13566, 18010, 12246, 9314, 17810, 16000, 9665, 4546, 16921, 11000,
          15752, 8331,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Yıl Kazanç",
        data: [
          16500, 12014, 18253, 19110, 1168, 16068, 19766, 14516, 12943, 7000,
          12743, 4300,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const weeklyEarn = {
    //AYLIK RANDEVU SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Kazanç",
        data: [
          1356, 1010, 1226, 914, 1710, 1600, 965, 546, 1921, 1000, 1552, 833,
          1356, 1810, 1246, 914, 1810, 1000, 665, 446, 1621, 1000, 1552, 331,
          1566, 1810, 1246, 914, 1710, 1000, 665,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Kazanç",
        data: [
          100, 1204, 1823, 1910, 168, 168, 1966, 416, 1943, 700, 1743, 400,
          1650, 124, 1853, 910, 168, 1668, 1766, 1416, 1243, 700, 1743, 430,
          600, 1214, 1253, 1110, 118, 1608, 1966,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const exactDailyEarn = {
    //GUNLÜK BRÜT KAZANÇ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: days,
    datasets: [
      {
        type: "bar",
        label: "Günlük Brüt Kazanç",
        data: [410, 720, 90, 250, 612, 130, 760],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Hafta Günlük Brüt Kazanç",
        data: [285, 415, 700, 86, 513, 326, 75],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };

  const exactMonthlyEarn = {
    //YILLIK BRÜT KAZANÇ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: months,
    datasets: [
      {
        type: "bar",
        label: "Bu Yıl Brüt Kazanç",
        data: [
          12566, 17010, 11246, 8314, 16810, 15000, 8665, 3546, 15921, 10000,
          14752, 7331,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Yıl Brüt Kazanç",
        data: [
          15500, 11014, 17253, 18110, 868, 15068, 18766, 13516, 11943, 6000,
          11743, 3300,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const exactWeeklyEarn = {
    //AYLIK BRÜT KAZANÇ SAYILARINI GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Brüt Kazanç",
        data: [
          1256, 910, 1126, 814, 1610, 1500, 865, 446, 1821, 900, 1452, 733,
          1256, 1710, 1146, 814, 1710, 900, 465, 346, 1521, 900, 1452, 231,
          1466, 1710, 1146, 814, 1610, 900, 565,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Brüt Kazanç",
        data: [
          75, 1104, 1723, 1810, 110, 110, 1866, 316, 1843, 600, 1643, 300, 1550,
          85, 1753, 810, 168, 1568, 1666, 1316, 1143, 600, 1643, 330, 500, 1114,
          1153, 1010, 118, 1508, 1866,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const addsense = {
    //AYLIK REKLAM GİDERLERİ GRAFİĞE DÖNÜŞÜTRDÜĞÜMÜZ DEĞİŞKEN DATA YERİNE VERİLER GELECEK
    labels: daysInMonth,
    datasets: [
      {
        type: "bar",
        label: "Bu Ay Reklam Giderleri",
        data: [
          125, 90, 116, 84, 110, 150, 85, 44, 182, 90, 142, 73, 126, 110, 146,
          84, 110, 90, 45, 34, 151, 90, 152, 31, 146, 110, 146, 81, 160, 90, 65,
        ],
        backgroundColor: "hsl(7, 90%, 64%)",
        borderColor: "hsl(7, 90%, 64%)",
      },
      {
        type: "bar",
        label: "Geçen Ay Reklam Giderleri",
        data: [
          75, 114, 173, 180, 10, 10, 186, 36, 143, 60, 163, 30, 150, 85, 153,
          110, 168, 168, 166, 131, 114, 60, 163, 30, 50, 114, 113, 110, 18, 158,
          186,
        ],
        backgroundColor: "hsl(0, 0%, 70%)",
        borderColor: "hsl(0, 0%, 70%)",
      },
    ],
  };
  const [graph, setGraph] = useState(dailyEarn);

  const boxes = [
    //İNFO KUTULARINA VERİLERİ GÖNDERDİĞİMİZ ARRAY
    {
      number: 3755,
      title: "GÜNLÜK KAZANÇ (₺)",
      lastOne: 3088,
      graphType: "dailyEarn",
      description: "Günlük kazancı gösterir.",
    },
    {
      number: 37295,
      title: "AYLIK KAZANÇ (₺)",
      lastOne: 34081,
      graphType: "weeklyEarn",
      description: "Aylık kazancı gösterir.",
    },
    {
      number: 153161,
      title: "YILLIK KAZANÇ (₺)",
      lastOne: 154381,
      graphType: "monthlyEarn",
      description: "Yıllık kazancı gösterir.",
    },
    {
      number: 2972,
      title: "BRÜT GÜNLÜK KAZANÇ (₺)",
      lastOne: 2400,
      graphType: "exactDailyEarn",
      description:
        "Brüt (vergileri ve komisyonları çıkardıktan sonra) Günlük kazancı gösterir.",
    },
    {
      number: 34095,
      title: "BRÜT AYLIK KAZANÇ (₺)",
      lastOne: 31401,
      graphType: "exactWeeklyEarn",
      description:
        "Brüt (vergileri ve komisyonları çıkardıktan sonra) aylık kazancı gösterir.",
    },
    {
      number: 141161,
      title: "BRÜT YILLIK KAZANÇ (₺)",
      lastOne: 143081,
      graphType: "exactMonthlyEarn",
      description:
        "Brüt (vergileri ve komisyonları çıkardıktan sonra) yıllık kazancı gösterir.",
    },
    {
      number: 3258,
      title: "REKLAM GİDERLERİ (₺)",
      lastOne: 3427,
      graphType: "addsense",
      description: "Bu ayki toplam reklam giderlerini gösterir.",
    },
    {
      number: 15,
      title: "VERGİ TUTARI",
      lastOne: 14,
      graphType: "taxes",
      description: "Toplam vergi tutarını gösterir.",
    },
  ];
  const optionsDailyEarn = {
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
          text: "Kazanç ( ₺ )", // Y ekseni başlığı
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

  const optionsMonthlyEarn = {
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
          text: "Kazanç ( ₺ )", // Y ekseni başlığı
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
  const optionsMonthlyAddsense = {
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
          text: "Reklam Gideri ( ₺ )", // Y ekseni başlığı
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
  const [options, setOptions] = useState(optionsDailyEarn);
  const changeGraph = (dataType) => {
    if (dataType === "dailyEarn") {
      setGraph({ ...dailyEarn });
      setOptions(optionsDailyEarn);
    } else if (dataType === "monthlyEarn") {
      setGraph({ ...monthlyEarn });
      setOptions(optionsMonthlyEarn);
    } else if (dataType === "weeklyEarn") {
      setGraph({ ...weeklyEarn });
      setOptions(optionsDailyEarn);
    } else if (dataType === "exactDailyEarn") {
      setGraph({ ...exactDailyEarn });
      setOptions(optionsDailyEarn);
    } else if (dataType === "exactMonthlyEarn") {
      setGraph({ ...exactMonthlyEarn });
      setOptions(optionsMonthlyEarn);
    } else if (dataType === "exactWeeklyEarn") {
      setGraph({ ...exactWeeklyEarn });
      setOptions(optionsDailyEarn);
    } else if (dataType === "addsense") {
      setGraph({ ...addsense });
      setOptions(optionsMonthlyAddsense);
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
              <InfoBoxFinance
                key={index}
                number={box.number}
                title={box.title}
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
  const [isAllDetailsOpen, setIsAllDetailsOpen] = useState(false);

  const toggleAllDetailsModal = () => {
    setIsAllDetailsOpen(!isAllDetailsOpen);
  };
  return (
    <>
      <div className=" my-4 bg-white mx-auto lg:mx-5 lg:px-5 lg:pb-5 rounded-lg max-[768px]:max-w-[370px] h-f">
        <div className="m-4 mb-0 block lg:flex items-center justify-center lg:justify-between">
          <h1 className="lg:text-[1.5vw] max-[768px]:text-xl font-semibold text-gray-600 pl-3 pt-4 text-center">
            Finans İstatistikleri
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
                        <h1 className=" text-premiumOrange text font-semibold ml-3 text-base lg:text-[1.4vw]">
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
                <div className="flex flex-col justify-center items-center mx-auto">
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
    </>
  );
}

export default FinanceStatistics;
