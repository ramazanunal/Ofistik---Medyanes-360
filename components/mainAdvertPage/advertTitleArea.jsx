import React, { useEffect, useState } from "react";
import BalanceModal from "../balanceModal/balanceModal";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

function AdvertTitleArea() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(null);
  const [giftBalance, setGiftBalance] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // State to keep track of the active slide index
  const announcments = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    "Lorem Ipsum is simply dummy text of the printing and  industry. ",
    "Lorem Ipsum is simply dummy text of the  and typesetting industry. ",
  ];
  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  function getTotalBalance(hesapNumarası) {
    const dataToSave = JSON.parse(localStorage.getItem("totalBalance")) || [];

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
    loadData();
  }, [totalBalance, giftBalance]);

  return (
    <>
      <div className="lg:flex m-5 justify-around">
        <div className="titleArea flex items-center justify-center my-4 lg:my-0 lg:w-1/4 bg-white rounded-lg lg:mr-5">
          <h1 className="md:text-[1.8vw] lg:text-[1.6vw] xl:text-[1.2vw] font-extrabold text-center py-2">
            Reklam Yönetimi
          </h1>
        </div>
        <div className="announcmentArea flex bg-gray-50 rounded-lg px-3 lg:px-10 my-4 lg:my-0 py-3 lg:py-5 justify-between mr-5 w-full relative lg:w-3/5">
          <i className="fa-solid fa-bullhorn text-[6vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1.8vw] text-premiumOrange mr-2 lg:mr-4 flex items-center justify-center"></i>
          <Swiper
            className="mySwiper w-auto my-auto max-h-[35px] max-w-[52vw] "
            autoplay={{ delay: 5000 }}
            modules={[Pagination, Autoplay, Navigation]}
            navigation={{
              prevEl: ".custom-swiper-button-prev",
              nextEl: ".custom-swiper-button-next",
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
          >
            {announcments.map((announcment, index) => (
              <SwiperSlide key={index}>
                <h1 className="md:text-[1.3vw] text-[3vw] lg:text-[1.1vw] xl:text-[0.9vw] flex items-center justify-center font-medium max-w-[900px]">
                  {announcment}
                </h1>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="pagesArea flex items-center justify-center lg:ml-4 font-semibold text-[2.5vw] md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.9vw] w-1/6 lg:w-1/4 relative">
            <i className="fa-solid fa-chevron-left mr-1 custom-swiper-button-prev cursor-pointer"></i>
            <h1 className=" text-premiumOrange mr-1">{activeSlideIndex + 1}</h1>{" "}
            <h1 className=" "> / {announcments.length}</h1>
            <i className="fa-solid fa-chevron-right ml-1 custom-swiper-button-next cursor-pointer"></i>
          </div>
        </div>
        <div className="animate__animated animate__zoomIn border-2 border-greenForButton walletArea flex group text-white hover:text-greenForButton bg-greenForButton rounded-lg px-4 py-2 lg:py-0 items-center justify-between lg:w-1/3 overflow-hidden relative transition-all will-change-transform after:bg-white z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-greenForButton after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform group-hover:after:bg-white">
          <div className="infoArea  mr-8">
            <h1 className="md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.9vw] text-xs font-semibold">
              Toplam Reklam Bakiyesi:{" "}
              {totalBalance !== null ? `${totalBalance} ₺` : "Yükleniyor"}
            </h1>
            <div className="giftWallet flex mt-2">
              <i className="fa-solid fa-gift mr-2"></i>
              <h1 className="md:text-[1.1vw] lg:text-[0.9vw] xl:text-[0.8vw] text-xs font-semibold">
                Hediye Bakiye:{" "}
                {giftBalance !== null ? `${giftBalance} ₺` : "Yükleniyor"}
              </h1>
            </div>
          </div>
          <div className="addWalletArea bg-greenDark rounded-full hover:bg-white hover:text-greenDark text-white md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1.2vw] group-hover:bg-greenForButton group-hover:text-white group-hover:border-2 group-hover:border-greenForButton">
            <button
              className=" xl:w-[2.3vw] xl:h-[2.3vw] lg:w-[3vw] lg:h-[3vw] md:w-[3.5vw] md:h-[3.5vw] w-[5.5vw] h-[5.5vw]  flex items-center justify-center"
              onClick={openWalletModal}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
      {isWalletModalOpen && (
        <BalanceModal
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
        />
      )}
    </>
  );
}

export default AdvertTitleArea;
