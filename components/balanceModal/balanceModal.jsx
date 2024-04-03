import React, { useState, useEffect } from "react";
import "./balanceModal.css";
import AddBalance from "./addBalance";
import GiftBalance from "./giftBalance";
import BalanceTransactions from "./balanceTransactions";

const BalanceModal = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [totalBalance, setTotalBalance] = useState(null);
  const [giftBalance, setGiftBalance] = useState(null);
  const [fullBalance, setFullBalance] = useState(1500); //DATABASE DEN KULLANICININ TÜM BAKİYESİNİ ÇEKECEĞİMİZ YER (HİZMET SATIŞLARINDAN ELDE ETTİĞİ GELİR)
  const renderPage = () => {
    switch (activePage) {
      case 0:
        return <AddBalance />;
      case 1:
        return <GiftBalance />;
      case 2:
        return <BalanceTransactions />;
      default:
        return null;
    }
  };
  function getTotalBalance(hesapNumarası) {
    const dataToSave = JSON.parse(localStorage.getItem("totalBalance")) || [];
    console.log(dataToSave, "dataToSave");

    if (Array.isArray(dataToSave)) {
      const existingAccount = dataToSave.find(
        (data) => data.hesapNumarası === hesapNumarası
      );

      if (existingAccount) {
        return existingAccount.miktar;
      } else {
        return 0;
      }
    } else {
      console.error("localStorage'dan alınan veri bir dizi değil.");
      return 0;
    }
  }
  function getGiftBalance(hesapNumarası) {
    const dataToSave = JSON.parse(localStorage.getItem("giftBalance")) || [];

    if (Array.isArray(dataToSave)) {
      const existingAccount = dataToSave.find(
        (data) => data.hesapNumarası === hesapNumarası
      );

      if (existingAccount) {
        return existingAccount.miktar;
      } else {
        return 0;
      }
    } else {
      console.error("localStorage'dan alınan veri bir dizi değil.");
      return 0;
    }
  }
  const loadData = () => {
    const accountNumber = 123456;
    const miktar = getTotalBalance(accountNumber);
    setTotalBalance(miktar);
    const giftMiktar = getGiftBalance(accountNumber);
    setGiftBalance(giftMiktar);
  };
  
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    loadData();
  });
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";
  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative mx-auto md:mx-9 px-auto lg:px-5 bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[940px] lg:min-w-[940px]">
          <div>
            <div className="flex flex-col max-w-[1200px] px-3  mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-x-2 lg:gap-x-5 mt-3 md:mt-10 text-xs lg:text-sm">
                {!isMobile && (
                  <div className="flex border-none font-bold p-1 mb-3 md:mb-0 text-sm lg:text-xl text-gray-600">
                    Bakiye Detay
                  </div>
                )}
                {isMobile && (
                  <div className="flex items-center justify-center relative w-full">
                    <div className="flex border-none font-bold p-1 pt-2 mb-3 md:mb-0 text-sm lg:text-2xl text-gray-600">
                      Bakiye Detay
                    </div>
                    <div
                      className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700 md:relative  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
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
                )}
                <div className="animate__animated animate__zoomIn border-2 border-premiumOrangeBG2 walletArea flex group text-premiumOrange  bg-premiumOrangeBG2 rounded-lg px-1 py-2 items-center justify-center w-full lg:w-1/3">
                  <div className="infoArea flex">
                    <h1 className="md:text-[1.1vw] lg:text-[0.9vw] xl:text-[0.7vw] text-xs font-semibold text-center">
                      Toplam Reklam Bakiyesi:{" "}
                      {totalBalance !== null
                        ? `${totalBalance}₺`
                        : "Yükleniyor"}
                    </h1>
                    <i className="fa-solid fa-gift mx-2"></i>
                    <h1 className="md:text-[1.1vw] lg:text-[0.9vw] xl:text-[0.7vw] text-xs font-semibold">
                      {giftBalance !== null ? `${giftBalance} ₺` : "Yükleniyor"}
                    </h1>
                  </div>
                </div>
                <div className="animate__animated animate__zoomIn border-2 border-premiumOrangeBG2 walletArea flex group text-premiumOrange  bg-premiumOrangeBG2 rounded-lg px-1 py-2 items-center justify-center w-full lg:w-1/3 mt-2 lg:mt-0">
                  <div className="infoArea">
                    <div className="giftWallet flex items-center justify-center">
                      <h1 className="md:text-[1.1vw] lg:text-[0.9vw] xl:text-[0.7vw] text-xs font-semibold">
                        Reklam bakiyesine aktarılabilir tutar: {fullBalance} ₺
                      </h1>
                    </div>
                  </div>
                </div>
                {!isMobile && (
                  <div
                    className="w-9 h-9 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-gray-200/50 hover:bg-red-500 group"
                    onClick={onClose}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
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
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="py-3 lg:pt-5">
                <div className="tabs tab-group flex justify-center items-center relative">
                  <button
                    className="tabs px-3 lg:px-10 relative md:text-[1.3vw] lg:text-[1.2vw] xl:text-[0.9vw] text-xs group transition-all duration-300 ease-in-out"
                    onClick={() => setActivePage(0)}
                  >
                    <h1
                      className={`p-3 hover:text-premiumOrange ${
                        activePage === 0
                          ? "border-b-2 border-premiumOrange text-premiumOrange font-semibold "
                          : "text-gray-500"
                      } `}
                    >
                      Bakiye Satin Al
                    </h1>
                  </button>
                  <button
                    className="tabs px-3 lg:px-10 relative md:text-[1.3vw] lg:text-[1.2vw] xl:text-[0.9vw] text-xs group transition-all duration-300 ease-in-out "
                    onClick={() => setActivePage(1)}
                  >
                    <h1
                      className={`p-3 hover:text-premiumOrange ${
                        activePage === 1
                          ? "border-b-2 border-premiumOrange text-premiumOrange font-semibold "
                          : "text-gray-500"
                      } `}
                    >
                      Hediye Bakiye
                    </h1>
                  </button>
                  <button
                    className="tabs px-3md:text-[1.3vw] lg:text-[1.2vw] xl:text-[0.9vw] lg:px-10 relative group transition-all duration-300 ease-in-out text-xs"
                    onClick={() => setActivePage(2)}
                  >
                    <h1
                      className={`p-3 hover:text-premiumOrange ${
                        activePage === 2
                          ? "border-b-2 border-premiumOrange text-premiumOrange font-semibold "
                          : "text-gray-500"
                      } `}
                    >
                      Hesap Hareketleri
                    </h1>
                  </button>
                </div>

                <div className="border mt-2 lg:mt-4"></div>
              </div>
              {renderPage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
