import React, { useState } from "react";
import Swal from "sweetalert2";
import giftCodes from "../giftCodes.json"; // giftCodes.json dosyasını projeye dahil ediyoruz

function GiftBalance() {
  const [code, setCode] = useState(""); // Kullanıcının girdiği kodu saklamak için bir state

  const handleCodeChange = (e) => {
    const formattedCode = e.target.value
      .replace(/\W/g, "")
      .replace(/(.{4})/g, "$1-")
      .slice(0, 19);
    setCode(formattedCode);
  };

  const handleActivateGift = (userAccountNumber) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const matchedGift = giftCodes.find(
      (gift) =>
        gift.code === code &&
        gift.limit > 0 &&
        gift.finish >= formattedDate &&
        !gift.usedAccounts.includes(userAccountNumber)
    );

    if (matchedGift) {
      let giftBalance = JSON.parse(localStorage.getItem("giftBalance")) || [];
      const existingAccountIndex = giftBalance.findIndex(
        (data) => data.hesapNumarası === userAccountNumber
      );

      if (existingAccountIndex !== -1) {
        giftBalance[existingAccountIndex].miktar += matchedGift.amount;
      } else {
        giftBalance.push({
          hesapNumarası: userAccountNumber,
          miktar: matchedGift.amount,
        });
      }

      let addBalanceData = JSON.parse(localStorage.getItem("addBalance")) || [];
      addBalanceData.push({
        hesapNumarası: userAccountNumber,
        miktar: matchedGift.amount,
        odemeTuru: 2,
        islemTarihi: formattedDate,
      });

      // Kullanılan hesabı hediye kodunun kullanılan hesaplar listesine ekle
      matchedGift.usedAccounts.push(userAccountNumber);

      localStorage.setItem("addBalance", JSON.stringify(addBalanceData));
      localStorage.setItem("giftBalance", JSON.stringify(giftBalance));
      matchedGift.limit--;

      Swal.fire({
        title: "Başarılı",
        text: `Kod başarılı bir şekilde etkinleştirildi. Hediye bakiyenize ${matchedGift.amount} TL eklendi !`,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Başarısız",
        text: "Geçersiz kod, kullanım tarihi geçmiş, zaten kullanılmış veya kullanım limiti dolmuş!",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div className="titleArea">
        <h1 className="text-sm md:text-[1.1vw] lg:text-[1.1vw] xl:text-[1.1vw] font-semibold text-gray-600 text-center">
          Hediye Bakiye Aktif Et
        </h1>
        <h1 className="text-xs md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-semibold text-gray-500 my-3 text-center">
          Size verilen hediye bakiye kodunu aşağıdaki alana yapıştırıp aktif
          edebilirsiniz.
        </h1>
        <h1 className="text-xs md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-semibold text-gray-500 mt-3 text-center">
          acA6-caEG-C39x-cvp9
        </h1>
        <h1 className="text-xs md:text-[0.9vw] lg:text-[0.9vw] xl:text-[0.9vw] font-semibold text-gray-500 mb-3 text-center">
          (Örnek kod 100TL değerinde)
        </h1>
      </div>
      <input
        type="text"
        className="border border-gray-300 p-2 mt-2 rounded-lg"
        placeholder="acA6-caEG-C39x-cvp9"
        value={code}
        onChange={handleCodeChange}
      />
      <div className="buttons lg:flex text-[3vw] md:text-[1.1vw] lg:text-[1vw] xl:text-[0.8vw] flex items-center justify-center my-5">
        <button
          className="flex items-center justify-center text-center py-2 px-10 text-premiumOrange bg-white hover:text-white border-2 border-premiumOrange rounded-lg font-semibold  overflow-hidden relative transition-all will-change-transform after:bg-premiumOrange z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-white after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
          onClick={() => handleActivateGift(123456)}
        >
          <span style={{ whiteSpace: "nowrap" }}>Hediye Çekini Aktif Et</span>
        </button>
      </div>
    </div>
  );
}

export default GiftBalance;
