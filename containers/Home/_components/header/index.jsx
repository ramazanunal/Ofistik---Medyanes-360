"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {RxCross2} from "react-icons/rx";
import {RxHamburgerMenu} from "react-icons/rx";
import classNames from "classnames";
import Logo from "@/assets/icons/logo";
import {Button} from "@/components/ui/button";
import AuthModal from "@/components/modal/auth";

function Header() {
    //hamburger meu button change
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //scroll event
    const [offset, setOffset] = useState(0);
    //change language menu
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setOffset(Math.floor(window.scrollY));

        // first enter website - control scroll
        onScroll()

        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <div
                id="header-animation"
                className={`sticky w-full transition-all delay-500 z-40 ${
                    isMenuOpen ? "show" : "hidden"
                }`}
            ></div>
            <header
                id="header"
                className={`fixed mx-auto left-0 right-0 border-2 border-transparent flex flex-wrap justify-self-center  items-center justify-between  px-[2%] transition-all  duration-500 text-muted  w-[90%] py-3 md:flex-nowrap md:gap-16 rounded-3xl md:rounded-full md:py-6 z-50
       ${
                    isMenuOpen ? "min-h-fit bg-[#fbfafa] border-2 border-muted-foreground !shadow-2xl mt-5 rounded-3xl mx-auto " : ""
                }
       ${
                    offset >= 80
                        ? "bg-white top-5 shadow-sm"
                        : "top-0 rounded-3xl bg-none"
                }`}
            >
                <Link href="#" className="flex items-center w-[110px] h-[47px]  ml-2">
                    <Logo color={
                        isMenuOpen ? "#322460" : offset >= 80 ? "#322460" : "#fff"
                    }/>
                </Link>

                <button
                    id="hamburger"
                    className="mr-2 md:hidden block p-1.5 rounded-full bg-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <RxCross2 className="font-medium" color="#1f1f1f"/>
                    ) : (
                        <RxHamburgerMenu className="text-lg" color="#322460"/>
                    )}
                </button>
                <nav
                    className={` justify-between items-center w-full ${
                        isMenuOpen ? "show" : "hidden"
                    } md:flex`}
                >
                    <div
                        className={`flex items-center gap-4 font-semibold mt-8 ${
                            isMenuOpen && "flex-col"
                        } md:flex-row md:mt-0`}
                    >
                        <Link href="#howToUse" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-foreground" : "text-muted",
                            isMenuOpen && "!text-foreground"
                        )}>NASIL ÇALIŞIR</Link>
                        <Link href="#aLittleBitAboutUs" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-foreground" : "text-muted",
                            isMenuOpen && "!text-foreground"
                        )}>HAKKIMIZDA</Link>
                        <Link href="#experts" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-foreground" : "text-muted",
                            isMenuOpen && "!text-foreground"
                        )}>PSİKOLOGLARIMIZ</Link>
                        <Link href="#faq" className={classNames(
                            "transition-all duration-500 ease-in-out hover:underline underline-offset-4 text-sm 2xl:text-base",
                            offset >= 80 ? "text-foreground" : "text-muted",
                            isMenuOpen && "!text-foreground"
                        )}>S.S.S.</Link>
                        <Link href="#">
                            <span className={classNames(
                                "hover:underline underline-offset-4 text-sm 2xl:text-base",
                                "transition-all duration-500 ease-in-out",
                                offset >= 80 ? "text-foreground" : "text-muted",
                                isMenuOpen && "!text-foreground"
                            )}>TESTLER</span>
                            <span className={classNames(
                                "ml-1 rounded-full px-1.5 py-0.5 text-xs 2xl:text-sm",
                                "transition-all duration-500 ease-in-out",
                                offset >= 80 ? "bg-foreground text-muted" : "bg-white text-foreground",
                                isMenuOpen && "!bg-foreground !text-muted"
                            )}>
                Yeni
              </span>
                        </Link>
                    </div>
                    <div className="flex relative flex-col gap-1 items-center justify-center md:flex-row">
                        <AuthModal />
                        <Link href="#">
                            <Button>
                                HEMEN KAYDOL
                            </Button>
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
