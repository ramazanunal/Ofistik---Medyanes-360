
"use client";
import React, { useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { BsCameraVideoFill } from "react-icons/bs";
import datas from "@/components/howToUse/data";

function Section2() {
  const [selectImage, setSelectImage] = useState("/images/step1.jpg");
  const [selectItemId, setSelectItemId] = useState(datas[0].id);

  const handleDivClick = (data) => {
    setSelectImage(data.image);
    setSelectItemId(data.id);
  };
  return (
      <div className="bg-white">
      <section className="container mx-auto flex md:flex-row flex-col justify-center items-center bg-white ">
        <div>
          <h2 className="text-textColor text-center md:text-left text-[30px] mb-14 mt-5">
            Nasıl Kullanırım ?
          </h2>
          <div className="flex flex-row md:flex-col justify-around md:justify-normal">
            {datas.map((data) => (
                <div
                    key={data.id}
                    onClick={() => handleDivClick(data)}
                    className={`md:mb-4 flex text-center md:text-left md:flex-col flex-row md:pl-4 md:pt-3 rounded-lg hover:cursor-pointer hover:bg-gray-200 hover:text-btnBg ${
                        selectItemId === data.id ? "bg-[#f3f4f6] text-[#5636be] opacity-100 font-medium" : ""
                    }`}
                >
                  <div className="flex flex-col md:flex-row gap-4 items-center md:mb-4">
                <span className="text-2xl border rounded-full p-2 bg-socialBg opacity-25 transition-all">
                  {data.id === 1 && <IoChatbubblesSharp size={32} />}
                  {data.id === 2 && <BsCalendarDate size={32}/>}
                  {data.id === 3 && <BsCameraVideoFill size={32}/>}
                </span>
                    <h2 className="hidden md:block md:text-lg lg:text-xl">{data.title}</h2>
                  </div>
                  <div className="mb-8 hidden md:block">
                    <p className="max-w-sm opacity-60">{data.desc}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:ml-36 py-10">
          <img
              src={selectImage}
              alt=""
              className="max-h-80 lg:max-h-96 xl:max-h-[500px] object-contain"
          />
          <p className="text-center text-purple text-xl md:hidden mt-10">
            Terapi seansın için en uygun tarih ve saati, seansler sekmesinden
            kolayca seçerek oluşturun. Seansınıza 24 saaat kalana kadar iptal
            edebilirsiniz
          </p>
        </div>
      </section>
      </div>
  );
}

export default Section2;
