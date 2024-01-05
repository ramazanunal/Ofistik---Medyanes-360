"use client";
import React, {useState, useEffect} from "react";
import classnames from "classnames";

function ChoseType({
                       headers
                   }) {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <>
            <div
                className="bg-white/50 p-2 rounded-md w-4/6 lg:w-2/6 my-8 flex flex-col md:flex-row"
            >
                {headers.map((header, idx) => (
                    <div
                        onClick={() => setActiveIndex(idx)}
                        key={idx}
                        className={classnames(
                            "flex flex-1 items-center transition-all duration-200 ease-in-out cursor-pointer py-3 rounded-xl text-md font-semibold justify-center",
                            activeIndex === idx && "bg-white/50 shadow-xl"
                        )}>
                        {header.title}
                    </div>
                ))}
            </div>

            <div className="w-4/6 lg:w-2/6">
                {headers[activeIndex]?.component}
            </div>
        </>
    );
}

export default ChoseType;
