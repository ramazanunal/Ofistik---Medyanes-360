import React, { useEffect, useState } from "react";
import BalanceTransactionsCard from "./balanceTransactionsCard";

function BalanceTransactions() {
  const [activePage, setActivePage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const localStorageDataAddBalance =
      JSON.parse(localStorage.getItem("addBalance")) || [];
    const localStorageDataAdverts =
      JSON.parse(localStorage.getItem("adverts")) || [];

    const mergedTransactions = [
      ...localStorageDataAddBalance,
      ...localStorageDataAdverts,
    ];

    setTransactions(mergedTransactions);
    setFilteredTransactions(mergedTransactions);
    setTotalPages(Math.ceil(mergedTransactions.length / itemsPerPage));
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTransactions.length / itemsPerPage));
  }, [filteredTransactions, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageNumberChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilterClick = (filterIndex) => {
    setActivePage(filterIndex);
    handlePageChange(1);
    if (filterIndex === 1) {
      setFilteredTransactions(transactions);
    } else if (filterIndex === 2) {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.miktar > 0)
      );
    } else if (filterIndex === 3) {
      setFilteredTransactions(
        transactions.filter((transaction) => transaction.gunlukButceMiktari > 0)
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <div className="bg-gray-100 p-2 mx-4 rounded-md flex ">
        <div
          className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
            activePage === 1
              ? "bg-premiumOrange shadow-xl text-white"
              : "text-gray-500"
          }`}
          onClick={() => handleFilterClick(1)}
        >
          Tümü
        </div>
        <div
          className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
            activePage === 2
              ? "bg-premiumOrange shadow-xl text-white"
              : "text-gray-500"
          }`}
          onClick={() => handleFilterClick(2)}
        >
          Gelen
        </div>
        <div
          className={`flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-2 lg:py-3 rounded-xl text-sm font-semibold justify-center ${
            activePage === 3
              ? "bg-premiumOrange shadow-xl text-white"
              : "text-gray-500"
          }`}
          onClick={() => handleFilterClick(3)}
        >
          Giden
        </div>
      </div>
      {currentTransactions.map((transaction, index) => (
        <BalanceTransactionsCard
          key={index}
          amount={transaction.miktar || -transaction.gunlukButceMiktari}
          date={transaction.islemTarihi || transaction.reklamTarihi}
          type={transaction.reklamTipi || transaction.odemeTuru}
          name={transaction.reklamAdi || "Bakiye Yükleme"}
        />
      ))}
      <div className="lg:flex justify-between m-3 text-sm md:text-[1vw] lg:text-[1vw] xl:text-[0.8vw]">
        <div className="flex items-center justify-center">
          <select
            id="pageNumberSelect"
            className="px-2 py-1 text-sm font-medium rounded-lg bg-white border-2 border-gray-200 text-gray-600"
            onChange={handlePageNumberChange}
            value={itemsPerPage}
          >
            <option value="">Sayfa Sayısı</option>
            {[...Array(6).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <h1 className="text-xs lg:text-sm text-gray-500 ml-2">
            Şuanda Gösterilen Sayı {itemsPerPage}
          </h1>
        </div>
        <ul className="flex space-x-2 mt-4 lg:mt-0">
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
  );
}

export default BalanceTransactions;
