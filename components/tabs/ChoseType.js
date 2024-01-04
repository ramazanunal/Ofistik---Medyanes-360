"use client";
import React, { useState, useEffect } from "react";
import Search from "./Search";
import "./style.css"

function ChoseType({typeText1,typeText2,searchPlaceholder}) {
    const [isActive, setIsActive] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.querySelector('.switch-handle').style.left = '15px';
        } else {
            // 768 pikselden büyük ekranlar için 155px olarak ayarlandı.
            const screenWidth = window.innerWidth;
            if (screenWidth >= 768) {
                document.querySelector('.switch-handle').style.left = '225px';
            } else {
                document.querySelector('.switch-handle').style.left = '155px';
            }
        }
    }, [isActive]);


    const toggleSwitch = (isOnline) => {
        if (isOnline && !isActive) {
            setIsActive(true);
            setShowDropdown(false);
        } else if (!isOnline && isActive) {
            setIsActive(false);
            setShowDropdown(false);
        }
    };
    const handleDropdownClick = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <>
            <div
                className="switch-container w-3/6 bg-switchBg text-headTxt1"
            >
                <div className={`switch-handle bg-switchHandleBg md:w-[210px] w-[120px] ${isActive ? "online-active" : ""}`}></div>
                <div className="switch-button text-xs md:text-md left-button" onClick={() => toggleSwitch(true)}>{typeText1}</div>
                <div className="switch-button text-xs md:text-md right-button" onClick={() => toggleSwitch(false)}>{typeText2}</div>
            </div>
            <Search searchPlaceholder={searchPlaceholder} isActive={isActive} showDropdown={showDropdown} setShowDropdown={setShowDropdown} handleDropdownClick={handleDropdownClick} />
        </>
    );
}

export default ChoseType;
