import Image from "next/image";
import React from "react";

function IconComponent({ icon, text }) {
  return (
    <div className="flex items-center justify-center flex-col  animate__animated animate__zoomIn">
      <div className="imageArea bg-grayBg relative rounded-full w-[27.5vw] h-[27.5vw] md:w-[14.5vw] md:h-[14.5vw] xl:w-[8.5vw] xl:h-[8.5vw] lg:w-[9.5vw] lg:h-[9.5vw]">
        <Image src={icon} quality={100} fill className="p-8" alt="" />
      </div>
      <h1 className="lg:text-[1.1vw] xl:text-[1vw] 2xl:text-[0.9vw] text-center text-gray-600 font-semibold mt-5">
        {text}
      </h1>
    </div>
  );
}

export default IconComponent;
