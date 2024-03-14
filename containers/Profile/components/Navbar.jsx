"use client";
import React, { useState, useEffect, useRef } from "react";
//Components
import SidebarMenu from "./Sidebar";
//Icons
import { PiStethoscopeFill } from "react-icons/pi";
import { IoCaretDown } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [dropShow, setDropShow] = useState("hidden");
  const [dropdownContent, setDropdownContent] = useState({
    flag: "/turkey.png",
    language: "TR",
  });
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(true);
  const dropdownRef = useRef(null);

  const dropdownData = [
    {
      flag: "/turkey.png",
      language: "TR",
    },
    {
      flag: "/england.png",
      language: "EN",
    },
  ];

  const handleDropdownShow = () => {
    setDropShow((prev) => (prev === "hidden" ? "block" : "hidden"));
  };

  const handleSideMenu = () => {
    setIsOpenSideMenu(!isOpenSideMenu);
  };

  const handleChangeDropdownContent = (item) => {
    setDropdownContent((prevContent) => {
      return { ...prevContent, flag: item.flag, language: item.language };
    });
    setDropShow("hidden");
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropShow("hidden");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 bg-white w-full mx-auto border-b z-30">
      <div className="max-w-[584px] md:max-w-[768px] md:max-w-full md:px-2 lg:px-5 mx-auto text-center">
        <div className="flex items-center justify-between px-3 sm:px-14  max-h-[60px] sm:max-h-[100px] py-8 md:py-12 ">
          <div className="flex items-center gap-5 lg:gap-10 xl:gap-[48px]">
            <h1 className="font-extrabold italic text-gray-800">OFISTIK</h1>
            <ul className="hidden md:flex items-center gap-[33px] text-[14px] text-gray-800">
              <li>Blog</li>
              <li>Hakkımızda</li>
              <li>İletişim</li>
            </ul>
            <div ref={dropdownRef} className="hidden md:block relative">
              <div
                onClick={() => handleDropdownShow()}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img className="w-8 xl:ml-10" src={dropdownContent.flag} />
                <div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-sm font-semibold">
                      {dropdownContent.language}
                    </h1>
                    <IoCaretDown className="text-premiumOrange" />
                  </div>
                </div>
              </div>
              <div
                className={`${dropShow} absolute bg-gray px-2 py-2 left-8 top-8 border z-30 bg-gray-50 rounded-md cursor-pointer`}
              >
                <div className="flex flex-col gap-2">
                  {dropdownData &&
                    dropdownData.map((item, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => handleChangeDropdownContent(item)}
                          className="flex items-center gap-5"
                        >
                          <img className="w-8 0" src={item.flag} />
                          <h1 className="text-sm font-semibold">
                            {item.language}
                          </h1>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 xl:gap-[56px]">
            <div className="hidden md:flex items-center gap-2 ">
              <div>
                <PiStethoscopeFill
                  size={25}
                  className="text-premiumOrange font-bold"
                />
              </div>
              <div className="text-sm">KURUMLAR</div>
            </div>
            <div className="hidden md:flex items-center gap-[1px]">
              <button className="bg-premiumOrange text-white min-w-[90px] tracking-normal rounded-s-md py-[9px] cursor-pointer hover:opacity-80 duration-300">
                Giriş
              </button>
              <button className="bg-premiumOrange text-white min-w-[90px] tracking-normal rounded-e-md py-[9px] cursor-pointer hover:opacity-80 duration-300">
                Üye Ol
              </button>
            </div>
            <div className="flex md:hidden ">
              <IoMenu
                className="text-gray-700 "
                onClick={() => handleSideMenu()}
                size={35}
              />
            </div>
            <SidebarMenu
              isOpenSideMenu={isOpenSideMenu}
              setIsOpenSideMenu={setIsOpenSideMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
