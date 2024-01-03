"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";

//icons
import {RxCross2} from "react-icons/rx";
import {RxHamburgerMenu} from "react-icons/rx";
import {TbWorld} from "react-icons/tb";
import {MdKeyboardArrowDown} from "react-icons/md";
import classNames from "classnames";
import {useMediaQuery} from "@/lib/useMediaQuery";
import Terrappin from "@/assets/icons/terrappin";

function Header() {
    //hamburger meu button change
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //scroll event
    const [offset, setOffset] = useState(0);
    //change language menu
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    const isMobile = useMediaQuery(768);

    useEffect(() => {
        const onScroll = () => setOffset(Math.floor(window.scrollY));
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    });

    return (
        <>
            <div
                className={`sticky w-full from-primaryDark transition-all delay-500 z-40 ${
                    isMenuOpen ? "show" : "hidden"
                }`}
            ></div>
            <header
                id="header"
                className={`fixed mx-auto left-0 right-0 flex flex-wrap justify-self-center  items-center justify-between  px-[2%]  transition-all  duration-500 text-secondaryDark  w-[90%] py-3 xl:flex-nowrap xl:gap-16 rounded-3xl xl:rounded-full xl:py-6 z-50
       ${
                    isMenuOpen ? "min-h-fit  bg-[#fbfafa] mt-5 rounded-3xl mx-auto " : ""
                }
       ${
                    offset >= 80
                        ? "bg-white top-5 shadow-sm"
                        : "top-0 rounded-3xl bg-none"
                }`}
            >
                <Link href="#" className="flex items-center w-[110px] h-[47px]  ml-2">
                    <Terrappin color={
                        isMenuOpen ? "#322460" : offset >= 80 ? "#322460" : "#fff"
                    }/>
                </Link>

                <button
                    id="hamburger"
                    className="mr-2 xl:hidden block"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <RxCross2 className="font-medium"/>
                    ) : (
                        <button className="p-1.5 rounded-full bg-white">
                            <RxHamburgerMenu className="text-lg" color="#322460"/>
                        </button>
                    )}
                </button>
                <nav
                    className={` justify-between items-center w-full ${
                        isMenuOpen ? "show" : "hidden"
                    } xl:flex`}
                >
                    <div
                        className={`flex items-center gap-4 font-semibold mt-8 ${
                            isMenuOpen && "flex-col"
                        } xl:flex-row xl:mt-0`}
                    >
                        <Link href="#howToUse" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-secondary" : "text-white",
                            isMobile && "!text-secondary"
                        )}>NASIL ÇALIŞIR</Link>
                        <Link href="#aLittleBitAboutUs" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-secondary" : "text-white",
                            isMobile && "!text-secondary"
                        )}>HAKKIMIZDA</Link>
                        <Link href="#experts" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-secondary" : "text-white",
                            isMobile && "!text-secondary"
                        )}>PSİKOLOGLARIMIZ</Link>
                        <Link href="#faq" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-secondary" : "text-white",
                            isMobile && "!text-secondary"
                        )}>S.S.S.</Link>
                        <Link href="#">
                            <span className={classNames(
                                "hover:underline underline-offset-4 text-sm 2xl:text-base",
                                "transition-all duration-500 ease-in-out",
                                offset >= 80 ? "text-secondary" : "text-white",
                            isMobile && "!text-secondary"
                            )}>TESTLER</span>
                            <span className={classNames(
                                "ml-1 rounded-full px-1.5 py-0.5 text-xs 2xl:text-sm",
                                "transition-all duration-500 ease-in-out",
                                offset >= 80 ? "bg-secondary text-white" : "bg-white text-secondary "
                            )}>
                Yeni
              </span>
                        </Link>
                    </div>
                    <div className="flex relative flex-col gap-1 my-2 items-center xl:flex-row">
                        <div className="flex justify-center xl:h-[55px] xl:w-[100px] mx-2">
                            <div
                                className={`border border-neutral text w-fit  rounded-xl flex flex-col items-center justify-center overflow-hidden ${
                                    isLanguageMenuOpen
                                        ? "min-h-[100px] xl:absolute left-2 top-0 "
                                        : "min-h-[50px]"
                                }`}
                                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                            >
                                <button
                                    className={`flex w-full h-[50px] items-center px-2 gap-2 ${
                                        isLanguageMenuOpen ? "bg-gray-100 " : ""
                                    }`}
                                >
                                    <TbWorld className="stroke-1 scale-125 h-[20px]"/>
                                    <span>TR</span>
                                    <MdKeyboardArrowDown className="scale-105 w-[20px]"/>
                                </button>
                                <button
                                    className={`w-full h-[50px] ${
                                        isLanguageMenuOpen ? "border-t bg-white" : "hidden"
                                    }`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                        <Link
                            href="#"
                            className={classNames(
                                "font-bold px-6 py-3 rounded-xl text-sm 2xl:text-base",
                                "transition-all duration-500 ease-in-out",
                                offset >= 80 ? "text-secondary" : "text-white"
                            )}
                        >
                            GİRİŞ YAP
                        </Link>
                        <Link
                            href="#"
                            className="bg-secondary text-white font-bold px-6 py-3 rounded-xl text-sm 2xl:text-base"
                        >
                            HEMEN KAYDOL
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
