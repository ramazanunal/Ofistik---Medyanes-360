"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnimate, motion, AnimatePresence, useInView } from "framer-motion";

// const CampaignCardDetails = ({ campaign }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-premiumOrange text-white w-full md:w-fit my-2 hover:bg-premiumOrangeBg hover:text-gray-100 transition-colors duration-200">
//           Detayları Gör
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Kampanya Detayları</DialogTitle>
//           <DialogDescription>
//             Bu kısımdan detaylı şekilde kampanya bilgilerini görebilirsiniz.
//           </DialogDescription>
//         </DialogHeader>
//         burada kampanya detayları yer alacak
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

const CampaignCard = ({ campaign }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={item}
        className="bg-white p-3 flex flex-col md:flex-row items-center justify-between item"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <img
            alt="Campaign"
            className="w-full h-52 md:w-44 md:h-44 object-cover rounded-md"
            height="80"
            src={campaign.image}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          <div className="space-y-3 my-2">
            <h3 className="text-lg md:text-xl font-semibold">
              {campaign.title}
            </h3>
            <p className="text-sm  text-gray-600">
              <span>Kampanya Tarihleri: </span>
              <span>
                {campaign.startDate} - {campaign.endDate}
              </span>
            </p>
            <p className="text-sm  text-red-500">
              <span>Son Katılım: </span>
              <span className="font-medium">{campaign.lastJoinDate}</span>
            </p>
            <div className="flex gap-3">
              {campaign?.tags?.map((item, index) => (
                <p
                  key={index}
                  className="bg-personBg px-2 py-1 text-xs font-medium text-gray-500 rounded-full"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
        <a
          href={`/campaign/detail/${campaign.id}`}
          className="bg-premiumOrange p-2 rounded-md text-white w-full md:w-fit my-2 hover:bg-premiumOrangeBg hover:text-gray-100 transition-all duration-200 hover:scale-[1.02] active:scale-[.98]"
        >
          Detayları Gör
        </a>{" "}
      </motion.div>
    </AnimatePresence>
  );
};

const CampaignCardSkeleton = () => {
  return (
    <div className="bg-white p-3 flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-full h-52 md:w-44 md:h-44 rounded-md" />
        <div className="space-y-3 my-2">
          <Skeleton className="w-[700px] h-5" />
          <Skeleton className="w-[620px] h-3" />
          <Skeleton className="w-[420px] h-3" />

          <div className="flex gap-3">
            {Array.from({
              length: 2,
            }).map((item, index) => (
              <p
                key={index}
                className="bg-personBg px-2 py-1 text-xs font-medium text-gray-500 rounded-full"
              >
                Pazarlama destekli
              </p>
            ))}
          </div>
        </div>
      </div>
      <a
        href="/campaign/detail/1"
        className="bg-premiumOrange text-white w-full md:w-fit my-2 hover:bg-premiumOrangeBg hover:text-gray-100 transition-colors duration-200"
      >
        Detayları Gör
      </a>
    </div>
  );
};

const CampaignSort = ({ setCampaignSort }) => {
  return (
    <Select onValueChange={setCampaignSort}>
      <SelectTrigger className="w-10/12 md:w-fit border space-x-2">
        <SelectValue placeholder="Sıralama" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">En yeni</SelectItem>
        <SelectItem value="oldest">En eski</SelectItem>
        <SelectItem value="mostPopular">En çok katılımcı</SelectItem>
        <SelectItem value="leastPopular">En az katılımcı</SelectItem>
      </SelectContent>
    </Select>
  );
};

function GeneralCampaign({ campaigns, setCampaigns }) {
  const [campaignSort, setCampaignSort] = useState("newest");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg mx-7 mb-8">
      <div className="p-6">
        <div className="flex flex-col  md:flex-row justify-center items-center md:justify-between">
          <h4 className="text-[4vw] md:text-[1.6vw] lg:text-[1.5vw] xl:text-[1.3vw] font-bold text-center mb-3 lg:mb-0">
            Katılabileceğiniz kampanyalar
          </h4>
          <CampaignSort setCampaignSort={setCampaignSort} />
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-5"
        >
          {campaigns?.map((campaign, index) => (
            <CampaignCard key={index} campaign={campaign} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default GeneralCampaign;
