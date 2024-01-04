import React from "react";

//data
import data from "./data";
import Card from "./card";

function ALitleBitAboutUs() {
  return (
      <div id="aLittleBitAboutUs" className="bg-deep-slate-blue w-full h-screen pt-24 flex items-center justify-center">
    <div className="w-3/4 mx-auto">
      <div className="container mx-auto px-[6%] xl:px-[3%]">
        <div className="text-white">
          <h3 className=" font-bold text-center text-base 2xl:text-2xl">
            BIZIM HAKKIMIZDA BIRAZ
          </h3>
          <p className="text-4xl font-bold text-center pb-8 text-4xl 2xl:pb-12 2xl:text-6xl">
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
