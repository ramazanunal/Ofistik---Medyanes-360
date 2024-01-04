"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import datas from "./data/cities.json";
import sugDatas from "./data/suggestions.json"

function Search({
                    isActive,
                    searchPlaceholder,
                    setShowDropdown,
                    showDropdown,
                    handleDropdownClick,
                }) {
    const inputPlaceholder =searchPlaceholder
    // önerileri bool tuttuğumuz state
    const [showSuggestions, setShowSuggestions] = useState(false);
    //seçilen şehri tuttuğumuz state
    const [selectedCity, setSelectedCity] = useState("Konum Seç");



    const handleCityClick = (city) => {
        setSelectedCity(city);
        setShowDropdown(false);
    };
    const handleInputFocus = () => {
        setShowSuggestions(true); // Inputa focuslandığında önerileri göstermek için bu state'i true yapıyoruz.
    };
    const handleInputBlur = () => {
        setShowSuggestions(false); // Inputtan focusu kaybettiğinde önerileri gizlemek için bu state'i false yapıyoruz.
    };


    const displayCityName = selectedCity.length > 6 ? `${selectedCity.substring(0, 6)}...` : selectedCity;
    return (
        <>
            <div className="mt-10 w-2/6 relative flex justify-center items-center">
                <div
                    className="flex w-full rounded-[25px] bg-inputBg relative"
                >
                    {!isActive && (
                        <div className="absolute button-container top-0 hidden md:block">
                            <button
                                onClick={handleDropdownClick}
                                className={`bg-inputLocBg mt-2 flex mx-2 min-w-[150px] max-w-[150px] rounded-xl px-6 py-4  text-inputTxt  ${
                                    showDropdown ? "" : "slideInFromLeft"
                                }`}
                            >
                                {displayCityName} <FaSortDown className="ml-4 text-bodyBg" />
                            </button>
                            {showDropdown && (
                                <div className="absolute scrollbar scrollbar-thin scrollbar-thumb-bodyBg scrollbar-track-locBg  top-19 ml-2 mt-3 w-[200px] max-h-[200px] overflow-y-auto text-gray-400  cursor-pointer  bg-white border rounded-xl shadow-lg">
                                    <ul  >
                                        {datas.map((data, index) => (
                                            <li
                                                key={index}
                                                className="p-2 hover:text-gray-600"
                                                onClick={() => handleCityClick(data)}
                                            >
                                                {data}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder={inputPlaceholder}
                        className={`w-full border-none bg-transparent  py-6 text-gray-900 outline-none focus:outline-none ${
                            isActive ? "pl-2" : " md:pl-44 pl-2"
                        }`}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <button className="m-2 rounded-xl bg-[#3de0a1] px-4 py-2 text-white flex items-center justify-center">
                        <span className="hidden md:block">ara</span> <IoSearch className="text-xl md:ml-4" />
                    </button>

                    {showSuggestions && (
                        <div className="absolute top-full mt-3 left-0 w-full max-h-[200px] overflow-y-auto text-gray-400 cursor-pointer bg-white border rounded-xl shadow-lg">
                            <ul>
                                {/* Başlıkları listeliyoruz */}
                                {sugDatas.başlıklar.map((title, index) => (
                                    <li key={index} className="p-2 font-bold ">
                                        <span className="hover:text-gray-600">{title}</span>
                                        {title === "Branşlar" && (
                                            <ul>
                                                {/* Bransları listeliyoruz */}
                                                {sugDatas.branslar.map((branch, branchIndex) => (
                                                    <li key={`branch-${branchIndex}`} className="p-2 hover:text-gray-600">
                                                        {branch}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <button className="font-semibold ml-[250px] text-[#1ebab5]">Tüm sonuçlar</button>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Search;
