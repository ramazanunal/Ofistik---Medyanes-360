"use client";
import React from "react";

import datas from "./datas.js";
import {GrValidate} from "react-icons/gr";
import {BsCameraVideoOff} from "react-icons/bs";
import {MdUpdateDisabled} from "react-icons/md";
import {LuMessagesSquare} from "react-icons/lu";

function Terapizone() {
  return (
      <div className="flex flex-col md:flex-row justify-center bg-white py-8 gap-8">
          {datas.map((data) => (
              <div
                  className=" md:p-5 pl-10 md:pl-0 md:mb-16 flex flex-row md:flex-col  items-center  md:max-w-[15rem] max-h-48 "
                  key={data.id}
              >
                  <div className="pr-4 pt-4 md:pr-0 md:pt-0">
            <span className=" justify-center items-center  flex">
              {data.id === 1 && (
                  <GrValidate className="text-[60px] text-iconColor opacity-70"/>
              )}
                {data.id === 2 && (
                    <BsCameraVideoOff className="text-[60px] text-iconColor opacity-70"/>
                )}
                {data.id === 3 && (
                    <MdUpdateDisabled className="text-[60px] text-iconColor opacity-70"/>
                )}
                {data.id === 4 && (
                    <LuMessagesSquare className="text-[60px] text-iconColor opacity-70"/>
                )}
            </span>
                  </div>
                  <div>
                      <h2 className="text-[15px] tracking-tight md:text-center font-[500] mt-10">
                          {data.title}
                      </h2>
                      <p className="text-[13px] md:text-center mt-3 opacity-50 ">
                          {data.desc}
                      </p>
                  </div>
              </div>
          ))}
      </div>
  );
}

export default Terapizone;
