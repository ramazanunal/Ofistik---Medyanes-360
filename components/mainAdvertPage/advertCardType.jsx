import React from "react";

function AdvertCardType({
  name,
  budget,
  type,
  viewNumber,
  clickNumber,
  sellNumber,
  ciro,
  status,
  start,
  end,
}) {
  return (
    <div className="max-w-[400px] bg-gray-100 rounded-xl text-gray-600 my-4">
      <div className="nameArea border-b-2 border-gray-300">
        <h1 className="px-4 py-2 text-center font-semibold text-md">{name}</h1>
      </div>
      <div className="dateArea flex items-center justify-start ml-4 mt-2">
        <i class="fa-solid fa-clock mr-1"></i>
        <div className="ml-2">
          <h1 className="text-sm font-semibold">Tarih</h1>
          <h1 className="pb-2 text-xs">
            {start} - {end}
          </h1>
        </div>
      </div>
      <div className="otherInfos">
        <div className="flex ">
          <div className="budgetArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-wallet mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Bütçe</h1>
              <h1 className="pb-2 text-xs">{budget} ₺</h1>
            </div>
          </div>
          <div className="typeArea flex items-center justify-start mr-4 w-1/2">
            <i class="fa-solid fa-address-card mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Reklam Türü</h1>
              <h1 className="pb-2 text-xs">
                {type === "1" ? "Gönderi Reklamı" : "Profil Reklamı"}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="viewArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-eye mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Görüntülenme</h1>
              <h1 className="pb-2 text-xs">{viewNumber}</h1>
            </div>
          </div>
          <div className="clickArea flex items-center justify-start mr-4 w-1/2">
            <i class="fa-solid fa-computer-mouse mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Tıklanma Sayısı</h1>
              <h1 className="pb-2 text-xs">{clickNumber}</h1>
            </div>
          </div>
        </div>
        <div className="flex ">
          <div className="sellArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-circle-check mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Satış Sayısı</h1>
              <h1 className="pb-2 text-xs">{sellNumber}</h1>
            </div>
          </div>
          <div className="sellArea flex items-center justify-start mr-4 w-1/2">
            <i class="fa-solid fa-money-check-dollar mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Ciro</h1>
              <h1 className="pb-2 text-xs">{ciro} ₺</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 font-semibold">
        <div
          className={`flex items-center w-full justify-center ${
            status === "Tamamlandı" ? "border-gray-500" : "border-greenBalance"
          } border ${
            status === "Tamamlandı" ? "bg-gray-200" : "bg-greenBalanceBg"
          } rounded-lg`}
        >
          <div className="flex p-1">
            <i
              className={`fa-solid fa-circle  ${
                status === "Tamamlandı" ? "text-gray-500" : "text-greenBalance"
              }  text-[0.5rem] flex items-center justify-center mx-2`}
            ></i>
            <h1
              className={`text-center text-sm ${
                status === "Tamamlandı" ? "text-gray-500" : "text-greenBalance"
              } `}
            >
              {status}
            </h1>
          </div>
        </div>
      </div>
      <div className="m-4 pb-4 flex font-semibold">
        <div className="flex items-center justify-center bg-purpleEliteBg rounded-lg w-1/2 mr-2">
          <div className="flex p-1">
            <i className="fa-solid fa-file-pen text-purpleElite text-[0.8rem] flex items-center justify-center mx-2  "></i>
            <h1 className="text-center text-sm text-purpleElite">Düzenle</h1>
          </div>
        </div>
        <div className="flex items-center justify-center  bg-redBalanceBg rounded-lg w-1/2">
          <div className="flex p-1">
            <i className="fa-solid fa-trash text-redBalance text-[0.8rem] flex items-center justify-center mx-2"></i>
            <h1 className="text-center text-sm text-redBalance">Sil</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertCardType;
