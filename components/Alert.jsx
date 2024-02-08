"use client"
import React, { useEffect } from 'react'
import { PiWarning } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";

const Alert = ({ alertType, alertVisible, alertMessage }) => {
    return (
        <div>
            {alertVisible && (
                <div className={`z-50 fixed top-20 md:top-28 left-5 text-white  mx-auto ${alertType === "warning"
                    ?
                    "px-4 py-1 bg-tertiaryRed text-white"
                    : alertType === "success"
                        ?
                        "bg-primaryGreen border opacity-70 border-none text-white"
                        :
                        ""}  
                  px-4 py-1 rounded` }

                >
                    <div className='flex items-center gap-2'>
                        {alertType === "warning" ? <PiWarning /> : alertType === "success" ? <FaCheck /> : null}
                        <span className="block text-xs">{alertMessage ? alertMessage : "welcome gabi-alert"}</span>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Alert
