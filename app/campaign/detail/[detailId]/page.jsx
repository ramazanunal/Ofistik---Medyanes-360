"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { data } from "./mocks";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaFileInvoice } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

function Page() {
  const { detailId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const turn = data.filter((item) => item.id == detailId);
    setCampaign(turn[0]);
    setLoading(false);
  }, []);

  console.log(campaign);
  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Not Found</div>;

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

  return (
    <div className="p-5 space-y-5 bg-slate-100 min-h-screen">
      <a
        href="/campaign"
        className="flex items-center justify-center gap-2 bg-white  p-2 rounded-md hover:scale-[1.02] active:scale-[.98] w-fit h-fit text-slate-700"
      >
        <IoMdArrowBack size={28} />
        <span className="text-lg font-medium">Kampanyalar</span>
      </a>
      <div className="bg-red-200 p-7 rounded-md flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex flex-col lg:flex-row items-center flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 sm:justify-center w-full p-4"
          >
            <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
              <FaFileInvoice size={28} />
            </div>
            <div className="flex flex-col items-start justify-center ">
              <p className=" text-2xl font-bold ">
                {new Intl.DateTimeFormat("tr-TR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(campaign.startDate))}
              </p>
              <h4 className="text-sm font-light">kampanya başlangıç tarihi</h4>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 sm:justify-center w-full p-4 lg:border-x border-gray-200"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
              <CiCalendar size={28} className="stroke-1" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className=" text-2xl font-bold">
                {new Intl.DateTimeFormat("tr-TR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(campaign.endDate))}
              </p>
              <h4 className="text-sm font-light">Kampanya bitiş tarihi</h4>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 sm:justify-center w-full p-4"
          >
            <div className="p-3 bg-premiumOrangeBG2 text-premiumOrange rounded-md">
              <CiClock2 size={28} className="stroke-1" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <p className=" text-2xl font-bold">
                {timeLeftCounter(campaign.startDate) == "-"
                  ? "Katılım süresi doldu"
                  : timeLeftCounter(campaign.startDate)}
              </p>
              <h4 className="text-sm font-light">Katılım için kalan süre</h4>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="py-3 px-7 bg-white rounded-md">
        <h3 className="flex justify-between items-center font-bold py-5 border-b-2 text-base uppercase">
          SÜREÇ NASIL İŞLER?
        </h3>
        <div className="flex flex-col lg:flex-row">
          {campaign.periods.map((period, idx) => (
            <div key={idx} className="flex items-center flex-col lg:flex-row">
              <div className="flex items-center p-5 space-x-8">
                <div className="rounded-full bg-slate-100 min-w-8 min-h-8 flex items-center justify-center text-premiumOrange font-medium">
                  {period.id}
                </div>
                <div className="space-y-2">
                  <h6 className="font-bold">{period.title}</h6>
                  <ul className=" list-disc">
                    {period.list.map((item, index) => (
                      <li className="list-item ml-4" key={index}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                {campaign.periods.length - 1 !== idx && (
                  <IoIosArrowForward
                    className="rotate-90 lg:rotate-0 min-w-8 min-h-8 text-slate-400"
                    size={28}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 bg-white rounded-md ">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-6">
              <Image
                src={campaign.img}
                alt="campaign"
                width={300}
                height={300}
                className="w-full h-full rounded-md"
              />
              <div className="">
                <h1 className="text-2xl font-bold whitespace-nowrap mb-4">
                  {campaign.name}
                </h1>
                <div className="flex flex-wrap justify-center gap-8">
                  <p className="text-center flex flex-col">
                    <span className="font-medium whitespace-nowrap">
                      Katılım
                    </span>
                    <span className="font-semibold text-lg">
                      {campaign.participation}
                    </span>
                  </p>
                  <p className="text-center flex flex-col">
                    <span className="font-medium whitespace-nowrap">
                      Kalan Miktar
                    </span>
                    <span className="font-semibold text-lg">
                      {campaign.remaining_amount}
                    </span>
                  </p>
                  <p className="text-center flex flex-col text-green-600">
                    <span className="font-medium whitespace-nowrap">
                      Toplam kar
                    </span>
                    <span className="font-semibold text-lg">
                      {campaign.after.net - campaign.before.net} TL
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-24 items-center">
            <div className="space-y-2">
              <h6 className="font-bold">Kampanya Öncesi</h6>
              <div className="flex items-center justify-between">
                <p className="font-medium">Fiyat</p>
                <p>{campaign.before.price} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Dakika</p>
                <p>{campaign.before.minute} dk</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Komisyon</p>
                <p>{campaign.before.commission} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Vergi</p>
                <p>{campaign.before.tax} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Net</p>
                <p>{campaign.before.net} TL</p>
              </div>
            </div>
            <IoIosArrowForward
              className="rotate-90 md:rotate-0 min-w-8 min-h-8 text-slate-400"
              size={28}
            />
            <div className="space-y-2">
              <h6 className="font-bold">Kampanya Sonrası</h6>
              <div className="flex items-center justify-between">
                <p className="font-medium">Fiyat</p>
                <p>{campaign.after.price} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Dakika</p>
                <p>{campaign.after.minute} dk</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Komisyon</p>
                <p>{campaign.after.commission} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Vergi</p>
                <p>{campaign.after.tax} TL</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Net</p>
                <p>{campaign.after.net} TL</p>
              </div>
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              className=" hover:bg-premiumOrangeBg hover:border-premiumOrange hover:text-white hover:scale-[1.02] active:scale-100  transition-all duration-200"
            >
              Kampanyaya Katıl
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
