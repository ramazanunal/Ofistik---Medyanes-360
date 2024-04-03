import React from "react";

function BalanceTransactionsCard({ amount, name, type, date }) {
  function formatTarih(tarihStr) {
    const tarih = new Date(tarihStr);
    const gun = tarih.getDate();
    const ay = tarih.toLocaleString("default", { month: "long" }); // Ayı uzun ismiyle alıyoruz

    return `${gun} ${ay}`;
  }
  return (
    <div className="flex bg-gray-50 lg:py-4 lg:px-10 rounded-lg m-4 p-1">
      <div className="w-1/6 flex items-center justify-center">
        <div className="icon my-auto lg:w-[2vw] lg:h-[2vw] w-[6vw] h-[6vw] text-xs md:text-md rounded-full bg-gray-200 flex items-center justify-center mr-3 lg:mr-10 text-gray-500">
          {amount > 0 && <i class="fa-solid fa-plus"></i>}
          {amount < 0 && <i class="fa-solid fa-minus"></i>}
        </div>
      </div>
      <div className="transactionDetails text-gray-500 w-3/6 my-auto">
        <h1 className="text-xs md:text-[1.2vw] lg:text-[1.05vw] xl:text-[0.9vw] font-semibold">
          {name}
        </h1>
        <h1 className="text-xs md:text-[1.1vw] lg:text-[0.95vw] xl:text-[0.8vw] mt-1">
          {type === 0
            ? "Hesaptan Bakiye Yükleme"
            : type === 1
            ? "Kredi Kartı İle Bakiye Yükleme"
            : type === 2
            ? "Hediye Kod İle Bakiye Yükleme"
            : type === "0"
            ? "Hizmet Reklamı"
            : "Profil Reklamı"}
        </h1>
      </div>
      <div className="amountAndDate lg:ml-10 w-2/6 my-auto">
        <div className="amount">
          <div
            className={`px-2 py-1 rounded-md flex items-center justify-center${
              amount < 0
                ? " bg-redBalanceBg text-redBalance"
                : " bg-greenBalanceBg text-greenBalance"
            }`}
          >
            <h1 className="text-sm font-semibold mr-1">{amount}</h1>
            <h1 className="text-xs">TL</h1>
          </div>
        </div>
        <div className="date text-gray-500 flex justify-end">
          <h1 className="text-xs mt-1 mr-1">{formatTarih(date)}</h1>
        </div>
      </div>
    </div>
  );
}

export default BalanceTransactionsCard;
