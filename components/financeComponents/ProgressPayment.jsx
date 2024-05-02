"use client";
import React, { useState, useEffect } from "react";
import { datas2 } from "./mock";
import { FaFileInvoice } from "react-icons/fa";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { cn } from "@/lib/utilities/utils";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { tryCurrencyFormat } from "./utils";

const CardItem = ({ title, value }) => {
  return (
    <div className="border-b pb-2 flex justify-between font-medium px-2">
      <span className="text-gray-400">{title}</span>
      <span>{tryCurrencyFormat(value)}</span>
    </div>
  );
};

export const ScaleAnimateComp = ({ animated, children, className }) => {
  return (
    <div
      className={cn("scale-0 transition-all duration-300", className, {
        "scale-100 duration-500": !animated,
      })}
    >
      {children}
    </div>
  );
};

function ProgressPayment() {
  const [progressPayment, setProgressPayment] = useState(datas2);
  const [currentNumber, setCurrentNumber] = useState(2);
  const [currentPayment, setCurrentPayment] = useState({});
  const [loading, setLoading] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const current = progressPayment[currentNumber];
    current && setCurrentPayment(current);
    setTimeout(() => {
      setAnimated(false);
    }, 300);
  }, [currentNumber, progressPayment]);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  const increment = () => {
    if (currentNumber < progressPayment.length - 1)
      setCurrentNumber(currentNumber + 1);
  };

  const decrement = () => {
    if (currentNumber > 0) setCurrentNumber(currentNumber - 1);
  };

  return (
    <div className="space-y-4 bg-white mx-auto md:px-4 md:mx-5 rounded-lg py-4  ">
      <div className="px-6">
        <h3 className="text-xl  font-medium">Vadesi gelen hakedişiniz.</h3>
        <p className=" italic">
          Görüntülediğiniz ödenecek tutar bilgisi, Bu bilgiler, aylık
          gelir-gider kayıtlarınızın
        </p>
      </div>
      <div
        className={cn(
          " p-6 rounded-md scale-0 transition-all space-y-6  duration-300",
          {
            "scale-100": mounted,
          }
        )}
      >
        <div className="border-b">
          <div className="relative flex flex-row w-full items-center justify-between px-4 pb-10">
            <button
              onClick={decrement}
              className="disabled:opacity-50 absolute bottom-0 left-0 sm:relative  disabled:text-gray-500 hover:scale-105 active:scale-100 text-premiumOrangeBg hover:text-premiumOrange transition-all duration-200"
              disabled={currentNumber === 0}
            >
              <IoIosArrowDropleftCircle size={34} />
            </button>
            <div className="flex flex-col lg:flex-row items-center flex-1">
              <ScaleAnimateComp
                animated={animated}
                className="flex items-center gap-2 sm:justify-center w-full p-4"
              >
                <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
                  <FaFileInvoice size={28} />
                </div>
                <div className="flex flex-col items-start justify-center ">
                  <p className=" text-2xl font-bold ">
                    {tryCurrencyFormat(
                      currentPayment.total_income_detail.total -
                        currentPayment.total_expense_detail.total
                    )}
                  </p>
                  <h4 className="text-sm font-light">Ödenecek Tutar</h4>
                </div>
              </ScaleAnimateComp>
              <ScaleAnimateComp
                animated={animated}
                className="flex items-center gap-2 sm:justify-center w-full p-4 lg:border-x border-gray-200"
              >
                <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
                  <CiCalendar size={28} className="stroke-1" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <p className=" text-2xl font-bold">
                    {currentPayment.vesting_period}
                  </p>
                  <h4 className="text-sm font-light">Hakediş dönemi</h4>
                </div>
              </ScaleAnimateComp>
              <ScaleAnimateComp
                animated={animated}
                className="flex items-center gap-2 sm:justify-center w-full p-4"
              >
                <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
                  <CiClock2 size={28} className="stroke-1" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <p className=" text-2xl font-bold">
                    {new Intl.DateTimeFormat("tr-TR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(currentPayment.payment_date))}
                  </p>
                  <h4 className="text-sm font-light">Öngörülen ödeme tarihi</h4>
                </div>
              </ScaleAnimateComp>
            </div>
            <button
              onClick={increment}
              className="disabled:opacity-50 absolute bottom-0 right-0 sm:relative disabled:text-gray-500 hover:scale-105 active:scale-100 text-premiumOrangeBg hover:text-premiumOrange transition-all duration-200"
              disabled={currentNumber === progressPayment.length - 1}
            >
              <IoIosArrowDroprightCircle size={34} />
            </button>
          </div>
          <div className="flex items-center gap-2 p-4 bg-blue-200 rounded-md  relative mx-auto md:mx-20 my-3">
            <div className="w-2 h-full absolute rounded-l-md left-0 top-0 bg-blue-500"></div>
            <FaInfoCircle className="text-blue-500 hidden sm:block" size={22} />
            <span className="text-gray-600 font-medium text-sm lg:text-base">
              Geçmiş dönemden kaynaklı gelir/gider kayıdınızla beraber bu
              hakediş döneminde hesabınıza yapılacak toplam ödeme tutarıdır.
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <ScaleAnimateComp
            animated={animated}
            className={cn("flex flex-col lg:w-1/2")}
          >
            {currentPayment.total_income_detail.campaign_discount && (
              <div className="flex items-center gap-2 w-full p-4">
                <div className="p-3 bg-green-200 rounded-md">
                  <IoMdArrowRoundUp
                    className="rotate-180 text-green-500"
                    size={28}
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <p className=" text-2xl font-bold">
                    {tryCurrencyFormat(
                      currentPayment.total_income_detail.total
                    )}
                  </p>
                  <h4 className="text-sm font-light">Toplam gelir</h4>
                </div>
              </div>
            )}
            <div className="space-y-2 p-4">
              <h4 className="px-0.5 font-bold text-xl">Satış Bazlı</h4>
              <div className="space-y-2">
                <CardItem
                  title={"Kampanya indirimi"}
                  value={currentPayment.total_income_detail.campaign_discount}
                />
                <CardItem
                  title={"Sipariş tutarı"}
                  value={currentPayment.total_income_detail.order_amount}
                />
                <CardItem
                  title={"Toplam"}
                  value={currentPayment.total_income_detail.total}
                />
              </div>
            </div>
          </ScaleAnimateComp>
          <ScaleAnimateComp
            animated={animated}
            className={cn("flex flex-col lg:w-1/2")}
          >
            {currentPayment.total_income_detail.campaign_discount && (
              <div className="flex items-center gap-2 w-full p-4">
                <div className="p-3 bg-red-200 rounded-md">
                  <IoMdArrowRoundUp className=" text-red-500" size={28} />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <p className=" text-2xl font-bold">
                    {tryCurrencyFormat(
                      currentPayment.total_income_detail.total
                    )}
                  </p>
                  <h4 className="text-sm font-light">Toplam gelir</h4>
                </div>
              </div>
            )}
            <div className="space-y-2 p-4">
              <h4 className="px-0.5 font-bold text-xl">Satış Bazlı</h4>
              <div className="space-y-2">
                <CardItem
                  title={"Kampanya indirimi"}
                  value={currentPayment.total_expense_detail.campaign_discount}
                />
                <CardItem
                  title={"Sipariş tutarı"}
                  value={currentPayment.total_expense_detail.ad_expense}
                />
                <CardItem
                  title={"Komisyon"}
                  value={currentPayment.total_expense_detail.commission}
                />
                <CardItem
                  title={"Vergi"}
                  value={currentPayment.total_expense_detail.tax}
                />
                <CardItem
                  title={"Toplam"}
                  value={currentPayment.total_expense_detail.total}
                />
              </div>
            </div>
          </ScaleAnimateComp>
        </div>
      </div>
    </div>
  );
}

export default ProgressPayment;
