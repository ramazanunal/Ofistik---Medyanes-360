"use client"
import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

function AdvertStatistic({ isOpen, onClose }) {
  Chart.register(...registerables);
  Chart.register(CategoryScale);

  const [selectedGraph, setSelectedGraph] = useState("advertViews");

  const advertViews = {
    labels: ["Aktif", "Tamamlanmış", "İptal"],
    datasets: [
      {
        data: [523, 869, 120],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };
  const clickedNumber = {
    labels: ["Aktif", "Tamamlanmış", "İptal"],
    datasets: [
      {
        data: [103, 60, 14],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FFCE90"],
      },
    ],
  };
  const sellNumber = {
    labels: ["Aktif", "Tamamlanmış", "İptal"],
    datasets: [
      {
        data: [5, 8, 11],
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
      },
    ],
  };
  const ciroNumber = {
    labels: ["Aktif", "Tamamlanmış", "İptal"],
    datasets: [
      {
        data: [1200, 3650, 320],
        backgroundColor: ["#4BC0C0", "#FFCE56", "#ac4abf"],
      },
    ],
  };
  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  const total =
    selectedGraph === "advertViews"
      ? advertViews.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : selectedGraph === "clickedNumber"
      ? clickedNumber.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : selectedGraph === "ciroNumber"
      ? ciroNumber.datasets[0].data.reduce((acc, val) => acc + val, 0)
      : sellNumber.datasets[0].data.reduce((acc, val) => acc + val, 0);

  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const handleTabChange = (selected) => {
    setSelectedGraph(selected);
  };

  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative mx-[3rem] p-5 bg-white rounded-2xl animate__animated animate__fadeInDown max-w-[1200px]">
          <div className="flex items-center justify-center relative">
            <div className="titleModal m-3">
              <h1 className="text-center mr-auto ml-auto w-full mb-0 text-md md:text-[1.5vw] lg:text-[1.4vw] xl:text-[1.3vw]">
                {selectedGraph === "advertViews"
                  ? "Toplam Gösterim Sayısı"
                  : selectedGraph === "clickedNumber"
                  ? "Toplam Tıklanma Sayısı"
                  : selectedGraph === "sellNumber"
                  ? "Toplam Satış Sayısı"
                  : selectedGraph === "ciroNumber"
                  ? "Toplam Ciro"
                  : ""}
              </h1>
            </div>
            <div
              className="w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-md p-4 cursor-pointer transition-all duration-700  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
              onClick={onClose}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
              </svg>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-center my-5 flex-wrap text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
            <button
              className={`px-4 py-1 mx-2 ${
                selectedGraph === "advertViews"
                  ? " text-premiumOrange border-b-2 border-premiumOrange"
                  : " text-gray-400  border-b-2 border-gray-300"
              }`}
              onClick={() => handleTabChange("advertViews")}
            >
              Toplam Gösterim Sayısı
            </button>
            <button
              className={`px-4 py-2 mx-2 ${
                selectedGraph === "clickedNumber"
                  ? "text-premiumOrange border-b-2 border-premiumOrange"
                  : "text-gray-400  border-b-2 border-gray-300"
              }`}
              onClick={() => handleTabChange("clickedNumber")}
            >
              Toplam Tıklanma Sayısı
            </button>
            <button
              className={`px-4 py-2 mx-2 ${
                selectedGraph === "sellNumber"
                  ? "text-premiumOrange border-b-2 border-premiumOrange"
                  : "text-gray-400  border-b-2 border-gray-300"
              }`}
              onClick={() => handleTabChange("sellNumber")}
            >
              Toplam Satış Sayısı
            </button>
            <button
              className={`px-4 py-2 mx-2 ${
                selectedGraph === "ciroNumber"
                  ? "text-premiumOrange border-b-2 border-premiumOrange"
                  : "text-gray-400  border-b-2 border-gray-300"
              }`}
              onClick={() => handleTabChange("ciroNumber")}
            >
              Toplam Ciro
            </button>
          </div>
          <div className="block md:flex text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
            <div className="generalDiv flex items-center justify-center">
              <div className="graphArea  mb-5 lg:mb-0 lg:h-[12vw] lg:w-[12vw] md:h-[25vw] md:w-[25vw] h-[40vw] w-[40vw] p-4 lg:p-8">
                <Doughnut
                  data={
                    selectedGraph === "advertViews"
                      ? advertViews
                      : selectedGraph === "sellNumber"
                      ? sellNumber
                      : selectedGraph === "clickedNumber"
                      ? clickedNumber
                      : selectedGraph === "ciroNumber"
                      ? ciroNumber
                      : advertViews
                  }
                  options={options}
                />
              </div>
            </div>
            <div className="ml-5 w-[68vw] lg:w-[55vw]">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-start">Durum</th>
                    <th className="text-start">Adet</th>
                    <th className="text-start">Yüzde</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGraph === "advertViews"
                    ? advertViews.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  advertViews.datasets[0].backgroundColor[
                                    index
                                  ],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {advertViews.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              advertViews.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "sellNumber"
                    ? sellNumber.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  sellNumber.datasets[0].backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {sellNumber.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              sellNumber.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "clickedNumber"
                    ? clickedNumber.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  clickedNumber.datasets[0].backgroundColor[
                                    index
                                  ],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {clickedNumber.datasets[0].data[index]}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              clickedNumber.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : selectedGraph === "ciroNumber"
                    ? ciroNumber.labels.map((label, index) => (
                        <tr key={index} className="border-b">
                          <td style={{ padding: "12px 0" }}>
                            <span
                              className="mr-2"
                              style={{
                                display: "inline-block",
                                width: "10px",
                                height: "10px",
                                backgroundColor:
                                  ciroNumber.datasets[0].backgroundColor[index],
                              }}
                            ></span>
                            {label}
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {ciroNumber.datasets[0].data[index]} ₺
                          </td>
                          <td style={{ padding: "12px 0" }}>
                            {calculatePercentage(
                              ciroNumber.datasets[0].data[index],
                              total
                            )}
                            %
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
                <tfoot>
                  <tr className="font-semibold">
                    <td style={{ padding: "12px 0" }}>Toplam</td>
                    <td style={{ padding: "12px 0" }}>
                      {total} {selectedGraph === "ciroNumber" ? "₺" : ""}
                    </td>
                    <td style={{ padding: "12px 0" }}>100%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertStatistic;
