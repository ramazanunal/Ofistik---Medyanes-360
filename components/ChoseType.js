"use client";
import React, { useState } from "react";
import classnames from "classnames";

function ChoseType({ headers, changeComponent,activeComponent }) {
    const [activeIndex, setActiveIndex] = useState(headers.indexOf(activeComponent))

    return (
        <div className="bg-white/50 p-2 rounded-md w-11/12 sm:w-full my-8 flex flex-row">
            {headers.map((header, idx) => (
                <div
                    onClick={() => {
                        setActiveIndex(idx)
                        changeComponent(header)
                    }}
                    key={idx}
                    className={classnames(
                        "flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-3 rounded-xl text-md font-semibold justify-center",
                        activeIndex === idx && "bg-white/50 shadow-xl"
                    )}>
                    {header}
                </div>
            ))}
        </div>
    );
}

export default ChoseType;
