'use client'
import React, { useState } from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function Card({
  image,
  name,
  status,
  category,
  starNumber,
  job,
  videoNumber,
  callNumber,
  language,
  skills,
  showedSkillsNumber,
  price,
  apointmentDate,
  commentNumber,
  minSessionTime,
}) {
  const [isHeartAnimating, setHeartAnimating] = useState(false);

  const heartAnimation = () => {
    setHeartAnimating(!isHeartAnimating);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < starNumber; i++) {
      // yıldız sayısı kadar yıl font u ekliyor
      stars.push(
        <i key={i} className="fa-solid fa-star text-blueOne text-center"></i>
      );
    }

    return stars;
  };

  return (
      <div className="text-center flex flex-col h-fit">
        <div className="!h-[270px] overflow-hidden flex flex-col m-0 p-0">
            <div className="relative w-full flex flex-col items-center justify-center">
              <Link href={"/"}>
                <img
                    src={image}
                    style={{
                      borderStyle: "solid dashed solid solid"
                    }}
                    className={`w-28 h-28 rounded-full ${
                        status !== undefined
                            ? `border-2 ${
                                status === 1 ? "border-blue-600" : "border-red-600"
                            }`
                            : ""
                    }`}
                    alt=""
                />
              </Link>
              {status !== undefined && (
                  <span
                      className={`bg-white bg-lightBlue ${
                          status === 1 ? "text-blue-600" : "text-red-600"
                      } px-3 py-1 rounded-2xl text-sm border-${
                          status === 1 ? "blue-600" : "red-600"
                      } border relative bottom-3.5`}
                  >
                  {status === 1 ? "Çevrim içi" : "Meşgul"}
                </span>
              )}
            </div>
            <div className="mt-1">
              <Link href={"/"}>
                <h3 className="text-center font-semibold">{name}</h3>
              </Link>
            </div>
            <div className="jobArea mt-2">
              <h4 className="text-center font-normal text-gray-600 text-sm">
                {job}
              </h4>
            </div>

          <h4 className="font-semibold text-sm md:text-base mt-4">₺{price}/Seans</h4>
          <h4 className="text-xs md:text-sm">
            {`(Minimum ${minSessionTime ?? 0} dakika)`}
          </h4>
        </div>

        <Button >
          Profili ziyaret et
        </Button>
        <div className="mt-auto">
          {status !== undefined && (
              <h5
                  className={`
              w-full overflow-hidden overflow-ellipsis mt-4 h-[45px]
              ${
                status === 1 ? "text-muted-foreground" : "text-destructive"
              } text-xs font-medium`}
            >
              {status === 1
                ? `*${name} şuan musait, randevu al butonuna tıklayarak hemen hizmet alabilirsiniz.`
                : `*${name} şuan musait değil, en yakın seansı: ${apointmentDate}`}
            </h5>
          )}
        </div>
      </div>
  );
}

export default Card;
