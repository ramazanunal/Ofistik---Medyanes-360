import React from "react";

function CardType({
  img,
  date,
  details,
  views,
  like,
  comment,
  checked,
  onChange,
}) {
  return (
    <div
      className={`max-w-[350px] ${
        checked ? "bg-premiumOrangeBG2 font-semibold" : "bg-gray-100 "
      } rounded-xl py-5 px-3 flex my-2 relative text-gray-600`}
    >
      <div className="imgArea w-1/3 flex justify-center items-center object-cover">
        <img src={img} alt="" />
      </div>
      <div className="infoArea text-sm  w-2/3">
        <div className="flex py-1 px-2 ">
          <i className="fa-regular fa-calendar mr-2 flex items-center justify-center"></i>
          <h1 className="">{date}</h1>
        </div>
        <div className="flex py-1 px-2">
          <i className="fa-solid fa-circle-info mr-2 flex items-center justify-center"></i>
          <h1 className="">{details}</h1>
        </div>
        <div className="flex py-1 px-2">
          <i className="fa-solid fa-eye mr-2 flex items-center justify-center"></i>
          <h1 className="">{views}</h1>
        </div>
        <div className="flex py-1 px-2">
          <i className="fa-regular fa-heart mr-2 flex items-center justify-center"></i>
          <h1 className="">{like}</h1>
        </div>
        <div className="flex py-1 px-2">
          <i className="fa-regular fa-comment mr-2 flex items-center justify-center"></i>
          <h1 className="">{comment}</h1>
        </div>
      </div>
      {onChange !== undefined && (
        <input
          type="checkbox"
          checked={checked}
          className=" absolute top-4 right-4 w-5 h-5"
          onChange={() => onChange(date)}
        />
      )}
    </div>
  );
}

export default CardType;
