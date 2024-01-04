import React from "react";
import ChoseType from "@/components/tabs/ChoseType";
import Header from "@/components/tabs/Header";

function FirstContent() {


    const headerText = "Doktor bul, randevu al,"
    const headerText2 = "online,"
    const headerText3 ="görüşme yap!"

    const typeText1 = "Online Görüşme"
    const typeText2="Yüz Yüze Randevu"

    const searchPlaceholder = "Doktor ve branş arayın..."

  return (
      <div className="w-full h-screen justify-center items-center flex flex-col bg-deep-slate-blue">
          <Header headerText={headerText} headerText2={headerText2} headerText3={headerText3} />
          <ChoseType typeText1={typeText1} typeText2={typeText2} searchPlaceholder={searchPlaceholder} />
      </div>
  );
}

export default FirstContent;
