import React from "react";

//data
import data from "./data";
import Card from "./card";

function ALitleBitAboutUs() {
  return (
      <div className="bg-deep-slate-blue w-full">
    <div id="aLittleBitAboutUs" className="w-3/4 mx-auto">
      <div className="container mx-auto px-[6%] py-[30px] xl:px-[3%]">
        <div className="text-white">
          <h3 className=" font-bold text-center lg:text-2xl">
            BIZIM HAKKIMIZDA BIRAZ
          </h3>
          <p className="text-4xl font-bold text-center py-[20px] lg:py-[50px] lg:text-6xl">
            yapmayı seviyoruz
          </p>
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((item, idx) => (
            <Card item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
      </div>
  );
}

export default ALitleBitAboutUs;
