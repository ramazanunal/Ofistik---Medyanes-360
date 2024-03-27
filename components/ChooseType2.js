"use client";
import React, { useState } from "react";
import classnames from "classnames";
import { twMerge } from "tailwind-merge";
import { FaUserFriends } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

function ChoseType2({
  headers,
  changeComponent,
  activeComponent,
  className,
  icon,
}) {
  const [activeIndex, setActiveIndex] = useState(
    headers.indexOf(activeComponent)
  );

  return (
    <div
      className={twMerge(
        " p-2 rounded-md sm:w-full my-8 flex flex-row items-center justify-around",
        className
      )}
    >
      {headers.map((header, idx) => (
        <div
          onClick={() => {
            setActiveIndex(idx);
            changeComponent(header);
          }}
          key={idx}
          className={classnames(
            "flex flex-1 items-center px-3 lg:px-8 transition-all duration-500 ease-in-out cursor-pointer py-3 text-sm lg:text-lg font-normal justify-center whitespace-nowrap",
            activeIndex === idx &&
              " text-premiumOrange border-b-2 border-premiumOrange",
            activeIndex !== idx && " text-gray-600 border-b-2 border-gray-400"
          )}
        >
          {header === "Takip ettiklerim" && (
            <FaUserFriends className="mr-3 text-xl" />
          )}
          {header === "Keşfet" && <FaRegCompass className="mr-3 text-xl" />}
          {header === "Kaydedilenler" && <FaRegSave className="mr-3 text-xl" />}
          {header}
        </div>
      ))}
    </div>
  );
}

export default ChoseType2;
