import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function FirstContent() {
  return (
      <div className="bg-[#4344E5] h-screen">
      <div className="flex w-3/4 pt-16 pb-8 flex-col lg:flex-row h-full mx-auto items-center justify-center gap-24">
        <div className="flex flex-col items-center lg:items-start pt-12 gap-8">
          <div className="text-white flex flex-col gap-4 text-center lg:text-start lg:self-end">
            <h1 className="font-bold text-xl lg:text-5xl lg:leading-[52px] lg:font-semibold ">
              Online terapi ile değişimi başlat!
            </h1>
            <p className="font-semibold text-sm max-w-sm lg:justify-self-start lg:text-xl">Hemen sana en uygun online
              psikolog ile eşleş ve değişime başla</p>
          </div>

          <Button
              href="/"
              className="hidden lg:block !w-48 !h-14"
          >
            Hemen Başla
          </Button>
        </div>

        <Image
            src="/images/slider.png"
            width={600}
            height={600}
            quality={100}
            alt="Picture of the author"
            className="lg:max-w-lg max-w-xs object-contain"
        />
      </div>
      </div>
  );
}

export default FirstContent;
