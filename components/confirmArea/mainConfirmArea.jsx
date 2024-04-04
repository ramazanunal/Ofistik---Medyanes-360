import React, { useState, useEffect } from "react";
import Image from "next/image";

function MainConfirmArea({
  advertName,
  advertType,
  advertEndDate,
  advertStartDate,
  selectedMethod,
  amount,
  time,
  selectedItems,
  total,
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    {
      /*ekran 768 den küçükse isMobil olur*/
    }
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-md md:text-[1.3vw] lg:text-[1.3vw] xl:text-[1.3vw] font-semibold p-6 pb-0">
        Reklam Özeti
      </h1>
      <div className="titleArea lg:flex w-full p-3">
        <div className="advertName justify-start p-4 lg:w-1/2">
          <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
            Reklam Adı
          </h1>
          <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
            {advertName}
          </h1>
        </div>
        <div className="lg:w-1/2 flex justify-end ">
          <div className="advertType justify-start px-6 my-4 border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Reklam Tipi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {advertType === "1" ? "Profil Reklamı" : "Gönderi Reklamı"}
            </h1>
          </div>
          <div className="advertStartDate justify-start px-6 my-4 border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Başlangıç Tarihi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {advertStartDate}
            </h1>
          </div>
          <div className="advertEndDate justify-start px-6 my-4 border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Bitiş Tarihi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {advertEndDate}
            </h1>
          </div>
        </div>
      </div>
      <div className="selectedInfos my-2 mx-6">
        <div className=" bg-premiumOrange w-full rounded-lg flex justify-around items-center">
          <div className="selectedAmount lg:flex p-3 lg:p-6">
            <div className="rounded-full flex items-center justify-center w-[10vw] h-[10vw] lg:w-[4vw] lg:h-[4vw] mx-auto bg-premiumOrangeBg text-white">
              <i className="fa-solid fa-coins lg:m-6 text-xs lg:text-lg"></i>
            </div>
            <div className="text-white ml-3 flex flex-col items-start justify-center mt-2 lg:mt-0">
              <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw]">
                {selectedMethod === "1" ? "Günlük Bütçe" : "Toplam Bütçe"}
              </h1>
              <h1 className="text-md md:text-[1.3vw] lg:text-[1.3vw] xl:text-[1.3vw] font-semibold">
                {amount} ₺
              </h1>
            </div>
          </div>
          <div className="selectedTime lg:flex p-3 lg:p-6">
            <div className="rounded-full flex items-center justify-center w-[10vw] h-[10vw] lg:w-[4vw] lg:h-[4vw] mx-auto bg-premiumOrangeBg text-white">
              <i className="fa-regular fa-calendar m-3 lg:m-6 text-xs lg:text-lg"></i>
            </div>
            <div className="text-white ml-3 flex flex-col items-start justify-center mt-2 lg:mt-0">
              <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw]">
                Reklam Süresi
              </h1>
              <h1 className="text-md md:text-[1.3vw] lg:text-[1.3vw] xl:text-[1.3vw] font-semibold">
                {time} Gün
              </h1>
            </div>
          </div>
          {advertType === "2" && (
            <div className="selectedItems lg:flex p-3 lg:p-6">
              <div className="rounded-full flex items-center justify-center w-[10vw] h-[10vw] lg:w-[4vw] lg:h-[4vw] mx-auto bg-premiumOrangeBg text-white">
                <i className="fa-solid fa-boxes-stacked  m-3 lg:m-6 text-xs lg:text-lg"></i>
              </div>
              <div className="text-white ml-3 flex flex-col items-start justify-center mt-2 lg:mt-0">
                <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw]">
                  Gönderi Sayısı
                </h1>
                <h1 className="text-md md:text-[1.3vw] lg:text-[1.3vw] xl:text-[1.3vw] font-semibold">
                  {selectedItems.length} / {total.length}
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
      {advertType === "2" && (
        <div className=" px-5">
          <div className="imgArea flex items-center justify-center">
            <Image
              src={"/img/postAdvert.png"}
              alt=""
              quality={100}
              height={400}
              width={400}
              objectFit="contain"
              className="w-auto !object-contain !max-h-[400px]"
            />
          </div>
          <div className="bg-gray-100 rounded-xl">
            <p className="p-5 text-gray-600 text-sm font-semibold text-center">
              Reklamınız yukardaki şekilde gözükecektir. Değişiklik yapmak
              isterseniz geri dönebilirsiniz.
            </p>
          </div>
        </div>
      )}

      {advertType === "1" && (
        <div className=" px-5">
          <div className="imgArea flex items-center justify-center">
            <Image
              src={"/img/previewProfileAdvert.png"}
              alt=""
              quality={100}
              height={500}
              width={500}
              className="w-auto !object-contain !max-h-[500px]"
            />
          </div>
          <div className="bg-gray-100 rounded-xl">
            <p className="p-5 text-gray-600 text-sm font-semibold text-center">
              Reklamınız yukardaki şekilde gözükecektir. Değişiklik yapmak
              isterseniz geri dönebilirsiniz.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainConfirmArea;
