import React from "react";

function FinanceCardType({
  name,
  id,
  income,
  tax,
  commission,
  ciro,
  status,
  date,
  time,
  gettingDate,
  threeDots,
}) {
  return (
    <div className="max-w-[400px] bg-gray-100 rounded-xl text-gray-600 my-4">
      <div className="nameArea border-b-2 border-gray-300 flex justify-between pr-2">
        <h1 className="px-4 py-2 text-center font-semibold text-md">{name}</h1>
        <div>{threeDots}</div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="dateArea flex items-center justify-start ml-4 mt-2 w-1/2">
          <i class="fa-regular fa-calendar"></i>
          <div className="ml-2">
            <h1 className="text-sm font-semibold">Tarih</h1>
            <h1 className="pb-2 text-xs">{date}</h1>
          </div>
        </div>
        <div className="timeArea flex items-center justify-start ml-4 mt-2 w-1/2">
          <i class="fa-solid fa-clock mr-1"></i>
          <div className="ml-2">
            <h1 className="text-sm font-semibold">Saat</h1>
            <h1 className="pb-2 text-xs">{time}</h1>
          </div>
        </div>
      </div>
      <div className="otherInfos">
        <div className="flex flex-row items-center justify-between">
          <div className="budgetArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-wallet mr-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Gelir ( ₺ )</h1>
              <h1 className="pb-2 text-xs">{income}</h1>
            </div>
          </div>
          <div className="typeArea flex items-center justify-start w-1/2 ml-4">
            <i class="fa-solid fa-money-bill"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Komisyon ( ₺ )</h1>
              <h1 className="pb-2 text-xs">{commission}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="viewArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-regular fa-money-bill-1"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Vergi ( ₺ )</h1>
              <h1 className="pb-2 text-xs">{tax}</h1>
            </div>
          </div>
          <div className="clickArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-wallet"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Net Gelir ( ₺ )</h1>
              <h1 className="pb-2 text-xs">{ciro}</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="sellArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-id-card-clip"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Randevu Numarası</h1>
              <h1 className="pb-2 text-xs">{id}</h1>
            </div>
          </div>
          <div className="sellArea flex items-center justify-start ml-4 w-1/2">
            <i class="fa-solid fa-calendar-week"></i>
            <div className="ml-2">
              <h1 className="text-sm font-semibold">Hesaba Geçiş Tarihi</h1>
              <h1 className="pb-2 text-xs">{gettingDate}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 font-semibold ">
        <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl mb-3">
          <i
            className={`fa-solid fa-circle  text-greenBalance text-[0.5rem] flex items-center justify-center mx-2`}
          ></i>
          <h1
            className={`text-center font-semibold text-sm  text-greenBalance`}
          >
            {status}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default FinanceCardType;
