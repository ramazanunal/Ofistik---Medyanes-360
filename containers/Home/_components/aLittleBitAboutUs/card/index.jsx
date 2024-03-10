"use client";
import React from "react";
import Image from "next/image";

function Card({ item }) {
  return (
    <div className="flex hover:scale-95 transition-all duration-200 ease-in-out hover:opacity-90 hover:shadow-md flex-col relative items-center rounded-lg shadow-sm bg-slate-200 w-fit font-semibold gap-4">
      <Image
        src={item.img}
        width={300}
        height={300}
        quality={100}
        alt={`${item.title} image`}
        className="object-contain mix-blend-multiply rounded-lg"
      />
      <h5 className="text-sm md:text-xl lg:text-2xl text-white absolute bottom-4 whitespace-nowrap z-20">
        {item.title}
      </h5>
      <div className="absolute bottom-0 left-0 bg-gradient-to-t rounded-b-lg from-slate-800 to-transparent h-24 w-full z-10" />
    </div>
  );
}

export default Card;
