"use client";

import React, { useState, useEffect } from "react";
import FinanceCardType from "./financeCardType";
function FinanceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Calculate total pages when data changes
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);
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
  useEffect(() => {
    const storedData = localStorage.getItem("adverts");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

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

  const currentPageData = data.slice(startIndex, endIndex);
  return (
    <>
      <div className="bg-white rounded-lg mx-5 mb-8">
        <div className="main pb-3">
          <div className="titleAndButtons lg:flex justify-between items-center m-4 px-4 py-6 pb-0 lg:pb-6">
            <h1 className="lg:text-[1.5vw] max-[768px]:text-xl font-semibold text-gray-600 pl-3 pt-4 text-center">
              Görüşmeler
            </h1>
          </div>
          <div className="tableArea my-4 px-4 mt-0 lg:mt-4 lg:pb-5">
            <table className="rounded-xl w-full ">
              {!isMobile && (
                <thead className="text-sm">
                  <tr className="sticky top-0 bg-lightGray text-gray-600">
                    <th className="py-3 px-1">Randevu Numarası</th>
                    <th className="py-3 px-1">İsim Soyisim</th>
                    <th className="py-3 px-1">Tarih</th>
                    <th className="py-3 px-1">Saat</th>
                    <th className="py-3 px-1">Fatura Durumu</th>
                    <th className="py-3 px-1">Gelir ( ₺ )</th>
                    <th className="py-3 px-1">Komisyon ( ₺ )</th>
                    <th className="py-3 px-1">Vergi ( ₺ )</th>
                    <th className="py-3 px-1">Net Gelir ( ₺ )</th>
                    <th className="py-3 px-1">Hesaba Geçiş Tarihi</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {/* {currentPageData.map(
                  (item, index) =>
                    (!isMobile && (
                      <tr key={index}>
                        <td className="px-2 py-3">
                          <div className="advertInfos flex items-center justify-start flex-col">
                            <h1 className="name text-sm">
                              66069a1d08bfe8acbd62ea91
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <h1 className="text-sm font-semibold">
                              Bayram Çınar
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center justify-center">
                            <h1 className="text-sm text-gray-400">
                              29.3.2024 Cuma
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            15:00 - 16:30
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ">
                            <i
                              className={`fa-solid fa-circle  
                                   text-greenBalance
                                 text-[0.5rem] flex items-center justify-center mx-2`}
                            ></i>
                            <h1
                              className={`text-center font-semibold text-sm 
                                     text-greenBalance
                                `}
                            >
                              Fatura Kesildi
                            </h1>
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            530 ₺
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm font-semibold flex items-center justify-center">
                            120 ₺
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            52 ₺
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            358 ₺
                          </h1>
                        </td>
                        <td className="px-2 py-3">
                          <h1 className="text-sm flex items-center justify-center">
                            15.04.2024
                          </h1>
                        </td>
                      </tr>
                    )) ||
                    (isMobile && (
                      <FinanceCardType
                        commission={"120 ₺"}
                        date={"29.3.2024 Cuma"}
                        id={"66069a1d08bfe8acbd62ea91"}
                        income={"530 ₺"}
                        name={"Bayram Çınar"}
                        status={"Fatura Kesildi"}
                        ciro={"358 ₺"}
                        tax={"52 ₺"}
                        time={"15:00 - 16:30"}
                        gettingDate={"15.04.2024"}
                        key={index}
                      />
                    ))
                )} */}
                <tr>
                  <td className="px-2 py-3">
                    <div className="advertInfos flex items-center justify-start flex-col">
                      <h1 className="name text-sm">66069a1d08bfe8acbd62ea91</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm font-semibold">Bayram Çınar</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm text-gray-400">29.3.2024 Cuma</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15:00 - 16:30
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ">
                      <i
                        className={`fa-solid fa-circle  
                                   text-greenBalance
                                 text-[0.5rem] flex items-center justify-center mx-2`}
                      ></i>
                      <h1
                        className={`text-center font-semibold text-sm 
                                     text-greenBalance
                                `}
                      >
                        Fatura Kesildi
                      </h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      530 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm font-semibold flex items-center justify-center">
                      120 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      52 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      358 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15.04.2024
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-3">
                    <div className="advertInfos flex items-center justify-start flex-col">
                      <h1 className="name text-sm">66069a1d08bfe8acbd62ea91</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm font-semibold">Bayram Çınar</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm text-gray-400">29.3.2024 Cuma</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15:00 - 16:30
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ">
                      <i
                        className={`fa-solid fa-circle  
                                   text-greenBalance
                                 text-[0.5rem] flex items-center justify-center mx-2`}
                      ></i>
                      <h1
                        className={`text-center font-semibold text-sm 
                                     text-greenBalance
                                `}
                      >
                        Fatura Kesildi
                      </h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      530 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm font-semibold flex items-center justify-center">
                      120 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      52 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      358 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15.04.2024
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-3">
                    <div className="advertInfos flex items-center justify-start flex-col">
                      <h1 className="name text-sm">66069a1d08bfe8acbd62ea91</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm font-semibold">Bayram Çınar</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm text-gray-400">29.3.2024 Cuma</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15:00 - 16:30
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ">
                      <i
                        className={`fa-solid fa-circle  
                                   text-greenBalance
                                 text-[0.5rem] flex items-center justify-center mx-2`}
                      ></i>
                      <h1
                        className={`text-center font-semibold text-sm 
                                     text-greenBalance
                                `}
                      >
                        Fatura Kesildi
                      </h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      530 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm font-semibold flex items-center justify-center">
                      120 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      52 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      358 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15.04.2024
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-3">
                    <div className="advertInfos flex items-center justify-start flex-col">
                      <h1 className="name text-sm">66069a1d08bfe8acbd62ea91</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm font-semibold">Bayram Çınar</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center justify-center">
                      <h1 className="text-sm text-gray-400">29.3.2024 Cuma</h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15:00 - 16:30
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ">
                      <i
                        className={`fa-solid fa-circle  
                                   text-greenBalance
                                 text-[0.5rem] flex items-center justify-center mx-2`}
                      ></i>
                      <h1
                        className={`text-center font-semibold text-sm 
                                     text-greenBalance
                                `}
                      >
                        Fatura Kesildi
                      </h1>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      530 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm font-semibold flex items-center justify-center">
                      120 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      52 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      358 ₺
                    </h1>
                  </td>
                  <td className="px-2 py-3">
                    <h1 className="text-sm flex items-center justify-center">
                      15.04.2024
                    </h1>
                  </td>
                </tr>
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
                  className={`px-5 py-2 border w-[80px] h-[40px] flex items-center justify-center cursor-pointer rounded-xl ${
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
    </>
  );
}

export default FinanceTable;
