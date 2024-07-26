"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import classNames from "classnames";
import Logo from "@/assets/icons/logo";
import LoginModal from "@/components/modal/auth/Login";
import RegisterModal from "@/components/modal/auth/Register";
import { useSession, signIn, signOut } from "next-auth/react";

import { Input } from "@/components/ui/input";
import Mock_data from "./MOCK_DATA.json";
import { AnimatePresence } from "framer-motion";
import Search_Algorithm from "@/containers/Home/_components/header/Search_Algorithm";
import { useHomeStore } from "@/store/HomeStore";

function Header() {
  const { data: session } = useSession();
  console.log(session);
  //hamburger meu button change
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //scroll event
  const [offset, setOffset] = useState(0);
  //change language menu
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  // Search Input value
  const [searchTerm, setSearchTerm] = useState("");
  // Aranmış verileri gösteren popup tarzı yapı
  const [isOpenSearchResults, setIsOpenSearchResults] = useState(false);
  // Arama yaparken verinin gelme süresince gönecek spiner'ın görünüp görünmeyeceğini belirleyen state
  const [isOpenSearchLoading, setIsOpenSearchLoading] = useState(false);
  // Data -> Ham Data ile başlangıç
  const [data, setData] = useState(Mock_data);
  // clicked keys
  const [clickedKeys, setClickedKeys] = useState([]);

  const activeComponent = useHomeStore((state) => state.activeComponent);

  const searching_keys = ["company_name", "job_title"];

  useEffect(() => {
    const onScroll = () => setOffset(Math.floor(window.scrollY));

    // first enter website - control scroll
    onScroll();

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.replace(" ", "") !== "") {
      setIsOpenSearchResults(true);
      setIsOpenSearchLoading(true);
    } else {
      setIsOpenSearchResults(false);
      setIsOpenSearchLoading(false);
    }

    const timer =
      searchTerm !== ""
        ? setTimeout(() => {
            const new_dt = Search_Algorithm(
              Mock_data,
              searchTerm,
              0.5,
              searching_keys,
              clickedKeys
            );
            setData(new_dt);
            setIsOpenSearchLoading(false);
          }, 1000)
        : null;

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const isAuthenticated = false;

  const navLinks =
    activeComponent == "Hizmet Al"
      ? [
          {
            href: "#aLittleBitAboutUs",
            title: "Hizmetlerimiz",
          },
          {
            href: "#howToUse",
            title: "Nasıl Kullanırım",
          },
          {
            href: "#mainFeatures",
            title: "Öne Çıkan Özellikler",
          },
          {
            href: "#faq",
            title: "S.S.S.",
          },
        ]
      : [
          {
            href: "#aLittleBitAboutUs",
            title: "Sektörünü bul",
          },
          {
            href: "#howToUse",
            title: "Nasıl Kullanırım",
          },
          {
            href: "#mainFeatures",
            title: "Öne Çıkan Özellikler",
          },
          {
            href: "#faq",
            title: "S.S.S.",
          },
        ];

  const NavLinkButton = ({ href, title }) => {
    return (
      <Link
        href={href}
        className={classNames(
          "transition-all duration-500 ease-in-out hover:underline underline-offset-4 whitespace-nowrap text-sm 2xl:text-base",
          offset >= 80 ? "text-foreground" : "text-muted",
          isMenuOpen && "!text-foreground"
        )}
      >
        {title.toUpperCase()}
      </Link>
    );
  };

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
        className={`fixed mx-auto left-0 right-0 border-2 border-transparent flex flex-wrap justify-self-center  items-center justify-between  px-[2%] transition-all  duration-500 text-muted  w-[90%] py-3 lg:flex-nowrap lg:gap-16 rounded-3xl lg:rounded-full lg:py-6 z-50
       ${
         isMenuOpen
           ? "min-h-fit bg-[#fbfafa] border-2 border-muted-foreground !shadow-2xl mt-5 rounded-3xl mx-auto "
           : ""
       }
       ${
         offset >= 80 ? "bg-white top-5 shadow-sm" : "top-0 rounded-3xl bg-none"
       }`}
      >
        <Link href="#" className="flex items-center w-[110px] h-[47px]  ml-2">
          <Logo
            color={isMenuOpen ? "#322460" : offset >= 80 ? "#322460" : "#fff"}
          />
        </Link>

        <button
          id="hamburger"
          className="mr-2 lg:hidden block p-1.5 rounded-full bg-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <RxCross2 className="font-medium" color="#1f1f1f" />
          ) : (
            <RxHamburgerMenu className="text-lg" color="#322460" />
          )}
        </button>
        <nav
          className={` justify-between items-center w-full ${
            isMenuOpen ? "show" : "hidden"
          } lg:flex`}
        >
          <div
            className={`flex w-full items-center gap-4 font-semibold mt-8 ${
              isMenuOpen && "flex-col"
            } lg:flex-row lg:mt-0 `}
          >
            {isAuthenticated ? (
              <div className="w-2/4 h-auto flex items-center relative">
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  className="w-full text-foreground"
                  placeholder={"Arama yap..."}
                />
                <AnimatePresence>
                  {isOpenSearchResults ? (
                    <div className="h-72 overflow-y-auto w-full rounded-md border !absolute top-full mt-2 bg-foreground/70 flex flex-col">
                      <div className="p-4 flex flex-col gap-4 h-72">
                        <h4 className="text-base font-medium leading-none">
                          Search Results
                        </h4>
                        {!isOpenSearchLoading ? (
                          data.map((dt, idx) => (
                            <>
                              <div
                                onClick={() => {
                                  const clickeds = [];

                                  searching_keys.forEach((key) => {
                                    clickeds.push(dt[key]);
                                  });

                                  setClickedKeys((prev) => [
                                    ...clickedKeys,
                                    {
                                      searchTerm: searchTerm,
                                      clicked: clickeds,
                                    },
                                  ]);
                                }}
                                key={idx}
                                className="text-sm flex items-center gap-4"
                              >
                                <img
                                  alt=""
                                  src={dt.avatar}
                                  loading="lazy"
                                  className="rounded-full bg-white w-10 h-10"
                                />
                                <div className="flex flex-col w-20">
                                  <span>{dt.first_name}</span>
                                  <span>{dt.last_name}</span>
                                </div>

                                <div className="h-full w-0.5 rounded-full bg-white/50" />

                                <span className="w-40">
                                  Company: {dt.company_name}
                                </span>

                                <div className="h-full w-0.5 rounded-full bg-white/50" />

                                <span className="w-40">
                                  Job: {dt.job_title}
                                </span>
                              </div>
                            </>
                          ))
                        ) : (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-6 h-6 my-auto mx-auto text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <>
                {navLinks.map((link, idx) => (
                  <NavLinkButton
                    key={idx}
                    href={link.href}
                    title={link.title}
                  />
                ))}
                {/* <Link href='#'>
                   <span
                     className={classNames(
                       'hover:underline underline-offset-4 text-sm 2xl:text-base',
                       'transition-all duration-500 ease-in-out',
                       offset >= 80 ? 'text-foreground' : 'text-muted',
                       isMenuOpen && '!text-foreground'
                     )}
                   >
                     TESTLER
                   </span>
                   <span
                     className={classNames(
                       'ml-1 rounded-full px-1.5 py-0.5 text-xs 2xl:text-sm',
                       'transition-all duration-500 ease-in-out',
                       offset >= 80
                         ? 'bg-foreground text-muted'
                         : 'bg-white text-foreground',
                       isMenuOpen && '!bg-foreground !text-muted'
                     )}
                   >
                     Yeni
                   </span>
                 </Link> */}
              </>
            )}
          </div>
          <div className="flex relative flex-col gap-1 items-center justify-center md:flex-row mt-4 md:mt-0 ">
            {session ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="w-[150px] text-sm 2xl:text-base font-semibold text-white bg-red-500 px-4 py-2 rounded-md transition-all duration-500 ease-in-out hover:bg-green-600"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <LoginModal />
                <RegisterModal />
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
