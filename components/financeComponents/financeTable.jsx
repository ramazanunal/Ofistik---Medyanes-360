"use client";

import React, { useState, useEffect, use } from "react";
import FinanceCardType from "./financeCardType";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utilities/utils";
import { datas } from "./mock";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tryCurrencyFormat } from "./utils";

function CustomChoseType({
  options,
  value,
  onChange,
  className,
  isMobile,
  ...rest
}) {
  return !isMobile ? (
    <div className={cn(" ml-4", className)} {...rest}>
      <div
        className="flex gap-5 px-2 py-1 rounded-lg bg-white  text-gray-500"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <button
            className={cn(
              "border-b-2 transition-all duration-200 ease-in-out hover:text-premiumOrange hover:border-premiumOrange",
              {
                "border-premiumOrange text-premiumOrange":
                  value === option.value,
              }
            )}
            onClick={onChange}
            key={index}
            value={option.value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className={cn("flex items-center ml-10 gap-2", className)} {...rest}>
      <select
        className="flex gap-2 px-2 py-1 font-medium rounded-lg bg-white  text-gray-500"
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option
            className={cn(
              "border-b-2 transition-all duration-200 ease-in-out hover:text-black hover:border-black",
              {
                "border-black text-black": value === option.value,
              }
            )}
            onClick={onChange}
            key={index}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const ThreeDots = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="text-sm font-semibold p-0 px-2 py-1 bg-transparent text-premiumOrange border-none"
          variant="outline"
        >
          <BsThreeDots size={20} className=" md:rotate-90" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit flex flex-col">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-none text-start ">
              Fatura Gör
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] h-fit max-h-[90dvh]  overflow-auto ">
            Fatura gelcek bu kısıma
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-none ">
              Fatura yükle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] h-fit max-h-[90dvh] overflow-auto ">
            <DialogHeader>
              <DialogTitle>fatura yükle</DialogTitle>
              <DialogDescription>
                bu kısımdan fatura yüklenecek
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
};

function FinanceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState(datas);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("");
  const isMobile = useMediaQuery(768);
  const [currentPageData, setCurrentPageData] = useState();

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

  useEffect(() => {
    setCurrentPageData(data.slice(startIndex, endIndex));
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const timeLeftCounter = (date) => {
    const now = new Date();
    const targetDate = new Date(date);

    // Check if targetDate is a valid date
    if (isNaN(targetDate.getTime())) {
      return "-";
    }

    if (now > targetDate) return "-";

    const timeDifference = Math.round(
      (targetDate - now) / (1000 * 60 * 60 * 24)
    );

    const formatter = new Intl.RelativeTimeFormat("tr", { style: "short" });
    const formattedTimeLeft = formatter.format(timeDifference, "day");

    return formattedTimeLeft;
  };

  useEffect(() => {
    status == "approaching" &&
      setCurrentPageData(
        data
          .filter((item) => timeLeftCounter(new Date(item.date)) != "-")
          .slice(startIndex, endIndex)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    status == "past" &&
      setCurrentPageData(
        data
          .filter((item) => timeLeftCounter(new Date(item.date)) == "-")
          .slice(startIndex, endIndex)
      );
    status == "current" &&
      setCurrentPageData(
        data
          .filter(
            (item) => timeLeftCounter(new Date(item.gettingDate)) == "now"
          )
          .slice(startIndex, endIndex)
      );
    status == "pending" &&
      setCurrentPageData(
        data
          .filter((item) => item.status == "pending")
          .slice(startIndex, endIndex)
      );
    status == "error" &&
      setCurrentPageData(
        data
          .filter((item) => item.status == "error")
          .slice(startIndex, endIndex)
      );
    status == "" && setCurrentPageData(data.slice(startIndex, endIndex));
  }, [status, currentPage]);

  useEffect(() => {
    // Calculate total pages when data changes
    currentPageData &&
      setTotalPages(Math.ceil(currentPageData.length / itemsPerPage));
  }, [data, itemsPerPage, currentPageData]);

  if (!data) return <div>Data yok</div>;
  if (!currentPageData) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg mx-auto md:mx-5 mb-8">
        <div className="main pb-3">
          <div className="titleAndButtons lg:flex justify-between items-center m-4 px-4 py-6 pb-0 lg:pb-6">
            <h1 className="lg:text-[1.5vw] max-[768px]:text-xl font-semibold text-gray-600 pl-3 pt-4 text-center">
              Görüşmeler
            </h1>
          </div>
          <CustomChoseType
            title="Fatura Durumu"
            options={[
              { value: "", label: "Hepsi" },
              { value: "approaching", label: "Yaklaşan" },
              { value: "past", label: "Geçmiş" },
              { value: "current", label: "Bugünkü" },
              { value: "pending", label: "Beklemede" },
              { value: "error", label: "Ödeme Alınamayan" },
            ]}
            value={status}
            onChange={handleStatusChange}
            className=""
            isMobile={isMobile}
          />
          <div className="tableArea my-4 px-4 mt-0 lg:mt-4 lg:pb-5  overflow-x-auto ">
            <table className="rounded-xl w-full table">
              {!isMobile && (
                <thead className="text-sm">
                  <tr className="sticky top-0 bg-lightGray text-gray-600">
                    <th className="py-3 px-1 whitespace-nowrap">
                      Randevu Numarası
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">
                      İsim Soyisim
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">Tarih</th>
                    <th className="py-3 px-1 whitespace-nowrap">Saat</th>
                    <th className="py-3 px-1 whitespace-nowrap">Gelir ( ₺ )</th>
                    <th className="py-3 px-1 whitespace-nowrap">
                      Komisyon ( ₺ )
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">Vergi ( ₺ )</th>
                    <th className="py-3 px-1 whitespace-nowrap">
                      Net Gelir ( ₺ )
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">
                      Hesaba Geçiş Tarihi
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">
                      Fatura Durumu
                    </th>
                    <th className="py-3 px-1 whitespace-nowrap">Kalan Süre</th>
                    <th className="py-3 px-1 whitespace-nowrap"></th>
                  </tr>
                </thead>
              )}
              <tbody>
                {currentPageData.map((item, index) =>
                  !isMobile ? (
                    <tr key={index} className="whitespace-nowrap">
                      <td className="px-2 py-3">
                        <div className="advertInfos flex items-center justify-start flex-col">
                          <h1 className="name text-sm">{item.id}</h1>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center justify-center">
                          <h1 className="text-sm font-semibold">{item.name}</h1>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center justify-center">
                          <h1 className="text-sm text-gray-400">
                            {new Intl.DateTimeFormat("tr-TR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              weekday: "short",
                            }).format(new Date(item.date))}
                          </h1>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <h1 className="text-sm flex items-center justify-center">
                          {item.time}
                        </h1>
                      </td>

                      <td className="px-2 py-3">
                        <h1 className="text-sm flex items-center justify-center">
                          {tryCurrencyFormat(item.income)}
                        </h1>
                      </td>
                      <td className="px-2 py-3">
                        <h1 className="text-sm font-semibold flex items-center justify-center">
                          {tryCurrencyFormat(item.commission)}
                        </h1>
                      </td>
                      <td className="px-2 py-3">
                        <h1 className="text-sm flex items-center justify-center">
                          {tryCurrencyFormat(item.tax)}
                        </h1>
                      </td>
                      <td className="px-2 py-3">
                        <h1 className="text-sm flex items-center justify-center">
                          {tryCurrencyFormat(item.ciro)}
                        </h1>
                      </td>
                      <td className="px-2 py-3">
                        <h1 className="text-sm flex items-center justify-center">
                          {new Intl.DateTimeFormat("tr-TR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(item.gettingDate))}
                        </h1>
                      </td>
                      <td className="px-2 py-3">
                        <div
                          className={cn(
                            "flex p-1 bg-greenBalanceBg border-greenBalance items-center justify-center rounded-xl ",
                            { "bg-yellow-100": item.status == "pending" },
                            { "bg-red-100": item.status == "error" }
                          )}
                        >
                          <i
                            className={cn(
                              "fa-solid fa-circle text-greenBalance text-[0.5rem] flex items-center justify-center mx-2",
                              { "text-yellow-500": item.status == "pending" },
                              { "text-red-500": item.status == "error" }
                            )}
                          ></i>
                          <h1
                            className={cn(
                              "text-center font-semibold text-sm text-greenBalance",
                              { "text-yellow-500": item.status == "pending" },
                              { "text-red-500": item.status == "error" }
                            )}
                          >
                            {item.status == "success" && "Fatura Kesildi"}
                            {item.status == "pending" && "Fatura Beklemede"}
                            {item.status == "error" && "Fatura Kesilemedi"}
                          </h1>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center justify-center">
                          <h1 className="text-sm text-gray-400">
                            {timeLeftCounter(new Date(item.date))}
                          </h1>
                        </div>
                      </td>
                      <td className="px-2 py-3">
                        <ThreeDots />
                      </td>
                    </tr>
                  ) : (
                    <FinanceCardType
                      commission={tryCurrencyFormat(item.commission)}
                      date={new Intl.DateTimeFormat("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        weekday: "short",
                      }).format(new Date(item.date))}
                      id={item.id}
                      income={tryCurrencyFormat(item.income)}
                      name={item.name}
                      status={"Fatura Kesildi"}
                      ciro={tryCurrencyFormat(item.ciro)}
                      tax={tryCurrencyFormat(item.tax)}
                      time={item.time}
                      gettingDate={new Intl.DateTimeFormat("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(item.gettingDate))}
                      threeDots={<ThreeDots />}
                      key={index}
                    />
                  )
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
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
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
