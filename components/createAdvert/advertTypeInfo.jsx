"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";

function AdvertTypeInfo({ img, q1, q2, q3, q4, title }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const modalClass = isModalOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";

  return (
    <>
      <div className="flex-col md:flex lg:flex-row justify-center items-stretch px-3 pb-5 gap-5">
        <div className="flex-col border rounded-lg mb-4 lg:mb-0 imgArea lg:flex-grow lg:w-1/3">
          {!isMobile && (
            <div className="flex relative justify-center items-center h-full p-1">
              <Image
                fill
                className="w-full h-full object-cover"
                src={img}
                alt="gönderi reklamı"
              />
            </div>
          )}
          {isMobile && (
            <button
              type="button"
              onClick={openModal}
              className=" bg-premiumOrangeBG2 text-premiumOrange py-1 px-3 rounded-lg text-sm font-semibold w-full"
            >
              Örnek Reklam
            </button>
          )}
        </div>
        <div className="flex-col border rounded-lg bg-lightGray infoArea lg:flex-grow lg:w-2/3 flex items-center justify-center">
          {title !== undefined && (
            <h1 className="text-sm md:text-[1vw] lg:text-[1vw] xl:text-[1vw]  font-semibold border-b-2 border-gray-300 p-2">
              {title}
            </h1>
          )}
          <div className="p-3 pt-0">
            <h3 className="font-bold md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.90vw] text-sm p-1 lg:p-2">
              Nedir ?
            </h3>
            <div className="whyUse px-1 lg:px-2">
              {q1.map((item, index) => (
                <div className="madde flex py-1" key={index}>
                  <i className="fa-solid fa-circle text-[7px] text-premiumOrange flex items-center justify-center mr-2"></i>
                  <h1 className="md:text-[1.2vw] lg:text-[1vw] xl:text-[0.8vw] text-xs ">
                    {item}
                  </h1>
                </div>
              ))}
            </div>
            <h3 className="font-bold md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.90vw] text-sm  p-1 lg:p-2">
              Neden Kullanılmalıdır ?
            </h3>
            <div className="whyUse px-1 lg:px-2">
              {q2.map((item, index) => (
                <div className="madde flex py-1" key={index}>
                  <i className="fa-solid fa-circle text-[7px] text-premiumOrange flex items-center justify-center mr-2"></i>
                  <h1 className="md:text-[1.2vw] lg:text-[1vw] xl:text-[0.8vw] text-xs ">
                    {item}
                  </h1>
                </div>
              ))}
            </div>
            <h3 className="font-bold md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.90vw] text-sm p-1 lg:p-2">
              Nerede Yayınlanır ?
            </h3>
            <div className="whyUse px-1 lg:px-2">
              {q3.map((item, index) => (
                <div className="madde flex py-1" key={index}>
                  <i className="fa-solid fa-circle text-[7px] text-premiumOrange flex items-center justify-center mr-2"></i>
                  <h1 className="md:text-[1.2vw] lg:text-[1vw] xl:text-[0.8vw] text-xs ">
                    {item}
                  </h1>
                </div>
              ))}
            </div>
            <h3 className="font-bold md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.90vw] text-sm p-1 lg:p-2">
              İpucu
            </h3>
            <div className="whyUse px-1 lg:px-2">
              {q4.map((item, index) => (
                <div className="madde flex py-1" key={index}>
                  <i className="fa-solid fa-circle text-[7px] text-premiumOrange flex items-center justify-center mr-2"></i>
                  <h1 className="md:text-[1.2vw] lg:text-[1vw] xl:text-[0.8vw] text-xs ">
                    {item}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={modalClass}>
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="relative mx-auto md:mx-9 px-auto lg:px-5 bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[940px] lg:min-w-[940px]">
            <div>
              <div className="flex flex-col max-w-[1200px] px-3  mx-auto rounded-lg bg-bgWhite">
                <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 md:mt-10 text-xs lg:text-sm">
                  <div className="flex items-center justify-center relative w-full">
                    <div className="flex border-none font-bold p-1 pt-2 mb-3 md:mb-0 text-sm lg:text-2xl text-gray-600">
                      Örnek Reklam
                    </div>
                    <div
                      className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700 md:relative  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
                      onClick={closeModal}
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
                </div>
                <div className="">
                  <div className="flex justify-center items-center h-full p-1">
                    <img
                      className="max-w-full max-h-full object-cover"
                      src={img}
                      alt="gönderi reklamı"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdvertTypeInfo;
