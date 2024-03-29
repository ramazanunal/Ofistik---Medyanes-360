import React, { useState } from "react";

function InfoBoxTotal({ number, title, description }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInfoIconHover = () => {
    setShowTooltip(true);
  };
  const handleInfoIconLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="rounded-md bg-premiumOrange relative lg:w-[12.75vw] m-1 2xl:m-3  w-40 animate__animated animate__zoomIn">
      <div className="infoIcon absolute right-0 top-0">
        <i
          onMouseOver={handleInfoIconHover}
          onMouseLeave={handleInfoIconLeave}
          className="fa-solid fa-circle-info text-xs md:text-[1.5vw] lg:text-[1.3vw] xl:text-[1vw] text-white absolute right-2 top-2 cursor-pointer"
        ></i>
        {showTooltip && (
          <div className="tooltip z-[3] bg-white border border-gray-300 p-2 rounded-xl shadow-lg absolute transform -translate-x-0 top-7 right-2 transition duration-300 w-[150px]">
            <h1 className="text-xs  font-semibold text-center text-gray-600">
              {description}
            </h1>
          </div>
        )}
      </div>
      <div className={`px-[0.3vw]  2xl:px-[0.5vw] py-[0.5vw] 2xl:py-[1.2vw] `}>
        <div className="titleArea flex justify-center m-2 ">
          <h1 className="text-[10px] lg:text-[0.8vw] text-white font-semibold">
            {title}
          </h1>
        </div>
        <div className="numberArea flex justify-center m-2 ">
          <h1 className="text-sm lg:text-[1.6vw] font-semibold text-white">
            {number}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default InfoBoxTotal;
