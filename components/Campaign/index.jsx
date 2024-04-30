"use client";
import React, { useState } from "react";
import CampaignTitleArea from "./CampaignTitleArea";
import WhyUseCampaign from "./WhyUseCampaign";
import CreatedCampaignTable from "./CreatedCampaignTable";
import GeneralCampaign from "./GeneralCampaign";

function CampaginContainer() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Yapı Market & Hırdavat Ürünlerinde Dev Fırsat",
      startDate: "29 Mart 2021 Pazartesi 00:00",
      endDate: "28 Mart 2022 Pazartesi 16:00",
      lastJoinDate: "28 Mart 2022 Pazartesi 16:00",
      tags: ["Pazarlama destekli", "Hızlı Onay"],
      image: "/campaign.png",
    },
    {
      id: 2,
      title: "Bahçe ürünlerinde 3 al 1 öde kampanyası",
      startDate: "10 Mart 2021 Pazartesi 00:00",
      endDate: "30 Mart 2022 Pazartesi 14:00",
      lastJoinDate: "22 Mart 2022 Pazartesi 13:00",
      tags: ["Pazarlama destekli", "Canlı Destek"],
      image: "/campaign.png",
    },
  ]);

  return (
    <div>
      <CampaignTitleArea />
      <WhyUseCampaign />
      {campaigns.length > 0 && (
        <GeneralCampaign campaigns={campaigns} setCampaigns={setCampaigns} />
      )}
      <CreatedCampaignTable />
    </div>
  );
}

export default CampaginContainer;
