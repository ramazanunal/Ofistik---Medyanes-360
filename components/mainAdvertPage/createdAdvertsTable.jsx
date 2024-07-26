import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AdvertCardType from "./advertCardType";
import AdvertStatistic from "../createAdvert/advertStatistic";
import { postAPI, getAPI, deleteAPI } from "@/services/fetchAPI";
import Swal from "sweetalert2";

function CreatedAdvertsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: session } = useSession();

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        if (session) {
          const adverts = await getAPI(`/addsense`);
          const userAdverts = adverts.filter(
            (ad) => ad.userID === session.user.id
          );
          setData(userAdverts);
        }
      } catch (error) {
        console.error("Failed to fetch adverts", error);
      }
    };

    fetchAdverts();
  }, [session]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageNumberChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setTotalPages(Math.ceil(data.length / value));
    setCurrentPage(1);
  };

  const statusFunction = (bitisTarihi) => {
    return new Date(bitisTarihi) < new Date() ? "Tamamlandı" : "Aktif";
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Emin misiniz!",
      text: "Reklamı silmek istediğinize emin misiniz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAPI(`/addsense/${id}`);
        const adverts = await getAPI(`/addsense`);
        const userAdverts = adverts.filter(
          (ad) => ad.userID === session.user.id
        );
        setData(userAdverts);
        Swal.fire({
          title: "Başarılı!",
          text: "Seçilen saat başarılı bir şekilde silindi.",
          icon: "success",
          confirmButtonText: "Kapat",
        });
      }
    });
  };

  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-white rounded-lg mx-5 mb-8">
        <div className="main pb-3">
          <div className="titleAndButtons lg:flex justify-between items-center m-4 px-4 py-6 pb-0 lg:pb-6">
            <h1 className="text-[4vw] md:text-[1.6vw] lg:text-[1.5vw] xl:text-[1.3vw] font-bold text-center mb-3 lg:mb-0">
              Oluşturulan Reklamlar
            </h1>
            <div className="buttons lg:flex text-[3vw] md:text-[1.1vw] lg:text-[1vw] xl:text-[0.8vw]">
              <button
                onClick={openModal}
                className="py-1 w-full px-4 bg-premiumOrangeBG2 text-premiumOrange rounded-lg text-sm font-semibold flex items-center justify-center mr-2 mb-2 lg:mb-0"
              >
                <i class="fa-solid fa-circle-info flex text-center justify-center mr-2"></i>
                Tüm İstatistikler
              </button>
              <Link
                className="flex items-center justify-center w-full text-center py-1 px-6 text-premiumOrange bg-white hover:text-white border-2 border-premiumOrange rounded-lg font-semibold mr-4 overflow-hidden relative transition-all will-change-transform after:bg-premiumOrange z-0 after:block after:w-full after:h-full after:absolute after:left-0 after:text-white after:top-0 after:transform after:translate-x-[-100%] after:origin-top-left after:transition-transform after:duration-[400ms] after:ease-out after:will-change-transform after:z-[-1] hover:after:translate-x-[0%] hover:border-2 hover:border-transparent hover:scale-105 hover:transform-none hover:duration-300 hover:ease-out hover:will-change-transform"
                href={"/addsense/reklamOlustur"}
              >
                <i className="fa-solid fa-circle-plus mr-2 "></i>
                <span style={{ whiteSpace: "nowrap" }}>
                  Yeni Reklam Oluştur
                </span>
              </Link>
            </div>
          </div>
          <div className="tableArea my-4 px-4 mt-0 lg:mt-4 lg:pb-5">
            <table className="rounded-xl w-full ">
              {!isMobile && (
                <thead className="text-sm">
                  <tr className="sticky top-0 bg-lightGray text-gray-600">
                    <th className="py-3 px-1">Reklam Bilgileri </th>
                    <th className="py-3 px-1">
                      Reklam Bütçesi{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Reklam Tipi{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2  cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Gösterim Sayısı{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Tıklanma Sayısı{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Satış Adedi{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Reklam Cirosu{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Harcama Getirisi{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">
                      Reklam Durumu{" "}
                      <i class="fa-solid fa-circle-info text-gray-400 ml-2 cursor-pointer"></i>
                    </th>
                    <th className="py-3 px-1">İşlemler </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {currentPageData.map(
                  (item, index) =>
                    (!isMobile && (
                      <tr key={index}>
                        <td className="px-2 py-3">
                          <div className="advertInfos flex items-center justify-start flex-col">
                            <h1 className="name text-md">{item.reklamAdi}</h1>

                            <h1 className="dates text-sm text-gray-400">
                              {item.baslangicTarihi} - {item.bitisTarihi}
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <h1 className="text-sm text-gray-400">Toplam : </h1>
                            <h1 className="text-sm font-semibold">
                              {item.gunlukButceMiktari}
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <h1 className="text-sm text-gray-400">
                              {item.reklamTipi === "1"
                                ? "Profil Reklamı"
                                : "Gönderi Reklamı"}
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            4.310
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            94
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            5
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm font-semibold flex items-center justify-center">
                            322,2 ₺
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            7.8
                          </h1>
                        </td>
                        <td className="px-2 py-3 flex items-center justify-center">
                          <div
                            className={`flex items-center w-full justify-center ${
                              statusFunction(item.bitisTarihi) === "Tamamlandı"
                                ? "border-gray-500"
                                : "border-greenBalance"
                            } border ${
                              statusFunction(item.bitisTarihi) === "Tamamlandı"
                                ? "bg-gray-200"
                                : "bg-greenBalanceBg"
                            } rounded-lg`}
                          >
                            <div className="flex p-1">
                              <i
                                className={`fa-solid fa-circle  ${
                                  statusFunction(item.bitisTarihi) ===
                                  "Tamamlandı"
                                    ? "text-gray-500"
                                    : "text-greenBalance"
                                }  text-[0.5rem] flex items-center justify-center mx-2 mt-[6px]`}
                              ></i>
                              <h1
                                className={`text-center text-sm ${
                                  statusFunction(item.bitisTarihi) ===
                                  "Tamamlandı"
                                    ? "text-gray-500"
                                    : "text-greenBalance"
                                } `}
                              >
                                {statusFunction(item.bitisTarihi)}
                              </h1>
                            </div>
                          </div>
                        </td>

                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-gray-400 mr-4"
                            >
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) ||
                    (isMobile && (
                      <AdvertCardType
                        budget={item.gunlukButceMiktari}
                        ciro={1300}
                        clickNumber={65}
                        end={item.bitisTarihi}
                        name={item.reklamAdi}
                        sellNumber={32}
                        start={item.baslangicTarihi}
                        status={statusFunction(item.bitisTarihi)}
                        type={item.reklamTipi}
                        viewNumber={694}
                        key={index}
                      />
                    ))
                )}
              </tbody>
            </table>
            <div className="lg:flex justify-between m-3 text-sm md:text-[1vw] lg:text-[1vw] xl:text-[0.8vw]">
              <div className="flex items-center justify-center">
                <select
                  id="pageNumberSelect"
                  className="px-2 py-1 text-sm font-medium rounded-lg bg-white border-2 border-gray-200 text-gray-600"
                  onChange={handlePageNumberChange}
                  value={itemsPerPage}
                >
                  <option value="">Sayfa Sayısı</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </select>
                <h1 className="text-xs lg:text-sm text-gray-500 ml-2">
                  Şuanda Gösterilen Sayı {itemsPerPage}
                </h1>
              </div>
              <ul className="flex space-x-2 mt-4 lg:mt-0 flex-wrap justify-center">
                <li
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-5 py-2 border w-[80px] h-[40px] flex items-center justify-center cursor-pointer rounded-xl ${
                    itemsPerPage < currentPageData.length ? "" : "hidden"
                  } ${
                    currentPage === 1
                      ? "bg-grayBg text-gray-600 font-semibold"
                      : "border-grayBg"
                  }`}
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Önceki
                  </button>
                </li>

                {[...Array(totalPages).keys()].map((page) => (
                  <li
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`px-3 py-2 border w-[40px] h-[40px] flex items-center justify-center cursor-pointer rounded-xl ${
                      page + 1 === currentPage
                        ? "bg-grayBg text-gray-600 font-semibold"
                        : "border-grayBg"
                    }`}
                  >
                    <button onClick={() => handlePageChange(page + 1)}>
                      {page + 1}
                    </button>
                  </li>
                ))}
                <li
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`${
                    itemsPerPage < currentPageData.length ? "" : "hidden"
                  }  px-5 py-2 border w-[80px] h-[40px] flex items-center justify-center cursor-pointer rounded-xl ${
                    currentPage === totalPages
                      ? "bg-grayBg text-gray-600 font-semibold"
                      : "border-grayBg"
                  }`}
                >
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sonraki
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AdvertStatistic
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default CreatedAdvertsTable;
