import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

function ConfirmCampaign(props) {
  const {
    campaignName,
    campaignType,
    campaignStartDate,
    campaignEndDate,
    selectedMethod,
    cartTotal,
    discountPercentage,
    time,
    selectedItems,
    total,
    audience,
    quotaType,
    quotaValue,
  } = props;

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
        Kampanya Özeti
      </h1>
      <div className="titleArea lg:flex w-full p-3">
        <div className="advertName justify-start p-4 lg:w-1/2">
          <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
            Kampanya Adı
          </h1>
          <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
            {campaignName}
          </h1>
        </div>
        <div className="lg:w-1/2 flex flex-col md:flex-row justify-end ">
          <div className="advertType justify-start px-6 my-4 pb-4 md:pb-0 border-b-2 md:border-b-0 md:border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Kampanya Tipi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {campaignType == "sepetteYuzdeIndirim"
                ? "Sepette Yüzde İndirim"
                : "Sepette Fiyat İndirim"}
            </h1>
          </div>
          <div className="advertStartDate justify-start px-6 my-4 pb-4 md:pb-0 border-b-2 md:border-b-0 md:border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Başlangıç Tarihi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {campaignStartDate}
            </h1>
          </div>
          <div className="advertEndDate justify-start px-6 my-4 pb-4 md:pb-0 border-b-2 md:border-b-0 md:border-l-2 border-gray-200">
            <h1 className="text-gray-500 text-xs md:text-[0.8vw] lg:text-[0.8vw] xl:text-[0.8vw] font-semibold">
              Bitiş Tarihi
            </h1>
            <h1 className="text-sm md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-bold mt-1">
              {campaignEndDate}
            </h1>
          </div>
        </div>
      </div>
      <div  className="px-6 ">
        <Image
          src="/marketing.png"
          alt="Confirm Campaign"
          className="w-full rounded-md"
          width={isMobile ? 320 : 800}
          height={isMobile ? 320 : 800}
        />
      </div>
      <div className="selectedInfos my-2 mx-6 bg-gray-400 rounded-lg flex flex-col flex-wrap  py-5 xl:flex-row gap-2.5 justify-around items-center text-white">
        <div className=" flex flex-col justify-center items-center">
          <span className="font-semibold">
            Kampanyadan Kimler faydalanabilir ?
          </span>
          <span>
            <span>{audience == "everyone" && "Herkese"} </span>
            <span>{audience == "firstAppointment" && "İlk randevu"}</span>
            <span>{audience == "secondAppointment" && "İkinci randevu"}</span>
            <span>{audience == undefined && "Kriter belirleyin"}</span>
          </span>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <span className="font-semibold">Ne kadar kişi yararlanabilir ?</span>
          <span className="font-medium">
            <span>
              {(quotaType == undefined || quotaType == "unlimited") &&
                "Limitsiz"}
            </span>
            <span>
              {quotaType != "" && quotaType != "unlimited" && quotaValue}
            </span>
          </span>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <span className="font-semibold">Toplam Sepet Tutarı</span>
          <span className="font-medium">
            <span>
              {cartTotal != undefined && Number(cartTotal) != NaN
                ? cartTotal + "TL"
                : "Lütfen sepet tutarını giriniz."}
            </span>
          </span>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <span className="font-semibold">İndirim Oranı</span>
          <span className="font-medium">
            <span>
              {discountPercentage != undefined &&
              Number(discountPercentage) != NaN
                ? cartTotal + "%"
                : "Lütfen indirim oranını giriniz."}
            </span>
          </span>
        </div>
        <div className=" flex flex-col justify-center items-center">
          <span className="font-semibold">Toplam İndirim</span>
          <span className="font-medium">
            <span>
              {cartTotal != undefined &&
              discountPercentage != undefined &&
              Number(cartTotal) * (Number(discountPercentage) / 100) != NaN
                ? Number(cartTotal) * (Number(discountPercentage) / 100) + "TL"
                : "Hesaplanamadı."}
            </span>
          </span>
        </div>
      </div>
      
    </div>
  );
}

export default ConfirmCampaign;
