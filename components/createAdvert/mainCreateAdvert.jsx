"use client";
import { useState } from "react";
import Pages from "./pages";
import CreateAdvertTitleArea from "./createAdvertTitle";
import AdvertInfo from "../advertInfo/advertInfo";
import MainSelectItemPage from "../selectItem/mainSelectItemPage";
import Swal from "sweetalert2";
import MainConfirmArea from "../confirmArea/mainConfirmArea";
import { postAPI, getAPI } from "@/services/fetchAPI";
import { useSession } from "next-auth/react";

function MainCreateAdvert({
  setInitialValueAdded,
  initialValueAdded,
  postList,
}) {
  const { data: session } = useSession();
  const [activePage, setActivePage] = useState(1);
  const [valuesForContent, setValuesForContent] = useState("");
  const [complatedPages, setComplatedPages] = useState([false, false, false]);

  const handleButtonBackClick = () => {
    if (activePage === 2) {
      setComplatedPages([false, false, false]);
      setValuesForContent("");
    }
    if (activePage === 3) {
      setComplatedPages([true, false, false]);
    }
    setActivePage((prevActivePage) => prevActivePage - 1);
    updateCompletionStatus(activePage - 1, false);
  };

  const handleButtonClick = () => {
    setActivePage((prevActivePage) => prevActivePage + 1);
    updateCompletionStatus(activePage - 1, true);
  };

  const onSubmit = async (values) => {
    try {
      setValuesForContent(values);
      setInitialValueAdded(values);
      setActivePage((prevActivePage) => prevActivePage + 1);
      updateCompletionStatus(activePage - 1, true);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "hata",
        text: "Tüm alanları doldurmalısın",
      });
      console.log(error.message);
    }
  };

  const updateCompletionStatus = (pageIndex, status) => {
    setComplatedPages((prevComplatedPages) => {
      const updatedComplatedPages = [...prevComplatedPages];
      updatedComplatedPages[pageIndex] = status;
      return updatedComplatedPages;
    });
  };
  const day = (date1, date2) => {
    //REKLAM SÜRESİNİ BULAN FONKSİYON
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };
  const renderPage = () => {
    switch (activePage) {
      case 1:
        return <AdvertInfo onSubmit={onSubmit} />;
      case 2:
        return (
          <MainSelectItemPage
            initialValues={valuesForContent}
            setInitialValueAdded={setInitialValueAdded}
            postList={postList}
          />
        );
      case 3:
        return (
          <MainConfirmArea
            advertEndDate={
              valuesForContent.bitisTarihi || initialValueAdded.bitisTarihi
            }
            advertName={
              valuesForContent.reklamAdi || initialValueAdded.reklamAdi
            }
            advertStartDate={
              valuesForContent.baslangicTarihi ||
              initialValueAdded.baslangicTarihi
            }
            advertType={
              valuesForContent.reklamTipi || initialValueAdded.reklamTipi
            }
            amount={
              valuesForContent.gunlukButceMiktari ||
              initialValueAdded.gunlukButceMiktari
            }
            selectedMethod={
              valuesForContent.reklamTipi || initialValueAdded.reklamTipi
            }
            time={day(
              valuesForContent.baslangicTarihi ||
                initialValueAdded.baslangicTarihi,
              valuesForContent.bitisTarihi || initialValueAdded.bitisTarihi
            )}
            total={postList}
            selectedItems={
              valuesForContent.reklamTipi === "2"
                ? initialValueAdded.hizmetler
                : []
            }
          />
        );
      default:
        return null;
    }
  };

  const finish = async () => {
    try {
      const result = await Swal.fire({
        title: "Emin misiniz?",
        text: "Girilen bilgiler ile reklam oluşturuluyor. Bir hata olduğunu düşünüyorsanız iptal edip düzenleyebilirsiniz.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oluştur",
        cancelButtonText: "İptal et",
      });

      if (result.isConfirmed) {
        // API'ye POST isteği gönder
        const advertData = {
          ...valuesForContent,
          userID: session.user.id,
        };
        const response = await postAPI("/addsense", advertData);
        console.log(response);
        if (response) {
          Swal.fire({
            text: "Reklamınız başarı ile oluşturuldu. Reklamlarım bölümünden detaylarını takip edip yönetebilirsiniz!",
            icon: "success",
            confirmButtonText: "Tamam",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/addsense";
            }
          });
        } else {
          throw new Error("Advert creation failed");
        }
      }
    } catch (error) {
      console.error("Error saving advert to API:", error);
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Reklam oluşturma sırasında bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };
  return (
    <>
      <CreateAdvertTitleArea />
      <div className="bg-white m-5 rounded-lg">
        <div className="block lg:flex">
          <Pages active={activePage} complated={complatedPages} />
          {renderPage()}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end border-t-2 border-gray-100 text-[3vw] md:text-[1.1vw] lg:text-[1vw] xl:text-[0.8vw]">
          {activePage > 1 && (
            <button
              style={{ marginTop: "24px" }}
              onClick={handleButtonBackClick}
              className="my-3 mb-0 lg:my-6 lg:mr-5 flex lg:mt-0 items-center justify-center text-center py-2 px-36 text-gray-600 bg-gray-200 border-2 hover:text-white border-gray-200 hover:border-gray-600 rounded-lg font-semibold overflow-hidden relative transition-all will-change-transform after:bg-gray-600 z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-gray-200 after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
            >
              Geri
            </button>
          )}
          {activePage < 3 && valuesForContent === "" && (
            <button
              value="Submit"
              form="myform"
              type="submit"
              style={{ marginTop: "24px" }}
              className="mb-3 lg:my-6 lg:mr-5 flex lg:mt-0 items-center justify-center text-center py-2 px-32 text-white bg-premiumOrange border-2 hover:text-premiumOrange border-premiumOrange rounded-lg font-semibold overflow-hidden relative transition-all will-change-transform after:bg-white z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-premiumOrange after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
            >
              Devam Et
            </button>
          )}
          {activePage < 3 && valuesForContent !== "" && (
            <button
              onClick={handleButtonClick}
              style={{ marginTop: "24px" }}
              className="mb-3 lg:my-6 lg:mr-5 flex lg:mt-0 items-center justify-center text-center py-2 px-32 text-white bg-premiumOrange border-2 hover:text-premiumOrange border-premiumOrange rounded-lg font-semibold overflow-hidden relative transition-all will-change-transform after:bg-white z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-premiumOrange after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
            >
              Devam Et
            </button>
          )}
          {activePage === 3 && (
            <button
              onClick={finish}
              style={{ marginTop: "24px" }}
              className="my-3 lg:my-6 lg:mr-5 flex lg:mt-0 items-center justify-center text-center py-2 px-36 text-white bg-premiumOrange border-2 hover:text-premiumOrange border-premiumOrange rounded-lg font-semibold overflow-hidden relative transition-all will-change-transform after:bg-white z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-premiumOrange after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
            >
              Bitir
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MainCreateAdvert;
