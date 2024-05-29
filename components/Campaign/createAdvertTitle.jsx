"use client"
import { useState, useEffect } from "react";
import BalanceModal from "../balanceModal/balanceModal";
import Link from "next/link";
function CreateAdvertTitleArea() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const [totalBalance, setTotalBalance] = useState(null);
  const [giftBalance, setGiftBalance] = useState(null);

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
  });

  return (
    <>
      <div className="lg:flex m-5 justify-between">
        <div className="titleArea flex items-center justify-start my-4 lg:my-0 lg:w-1/4  rounded-lg lg:mr-5">
          <Link href={"/"}>
            <i className="fa-solid fa-arrow-left md:text-[1.8vw] lg:text-[1.6vw] xl:text-[1.2vw] font-extrabold mr-5 cursor-pointer flex items-center justify-center"></i>
          </Link>
          <h1 className="md:text-[1.8vw] lg:text-[1.6vw] xl:text-[1.2vw] font-extrabold text-center py-2">
            Kampanya Yönetimi
          </h1>
        </div>
        <div className="animate__animated animate__zoomIn walletArea py-3 border-2 border-greenForButton flex group text-white hover:text-greenForButton bg-greenForButton rounded-lg px-4 items-center justify-between lg:w-1/4 overflow-hidden relative transition-all will-change-transform after:bg-white z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-greenForButton after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform group-hover:after:bg-white">
          <div className="infoArea  mr-8">
            <h1 className="md:text-[1.3vw] lg:text-[1.1vw] xl:text-[0.9vw] text-sm font-semibold">
              Güncel Hizmet Verilen fiyat:{" "}
              {totalBalance !== null ? `${totalBalance}₺` : "Yükleniyor"}
            </h1>
            <div className="giftWallet flex mt-2">
              <i className="fa-solid fa-gift mr-2"></i>
              <h1 className="md:text-[1.1vw] lg:text-[0.9vw] xl:text-[0.8vw] text-xs font-semibold">
                Güncel Hizmet süresi:{" "}
                {giftBalance !== null ? `10 saat` : "Yükleniyor"}
              </h1>
            </div>
          </div>
          <div className="addWalletArea bg-greenDark rounded-full hover:bg-white hover:text-greenDark text-white md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1.2vw] group-hover:bg-greenForButton group-hover:text-white group-hover:border-2 group-hover:border-greenForButton">
            <button
              className=" xl:w-[2.1vw] xl:h-[2.1vw] lg:w-[2.8vw] lg:h-[2.8vw] md:w-[3.1vw] md:h-[3.1vw] w-[5.5vw] h-[5.5vw]  flex items-center justify-center"
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

export default CreateAdvertTitleArea;
