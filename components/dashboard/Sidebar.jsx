'use client'

import React, {useEffect, useState, useRef} from 'react'
import classNames from "classnames";
import ChevronsLeft from "@/assets/icons/ChevronsLeft";
import {usePathname} from "next/navigation";
import ChevronsRight from "@/assets/icons/ChevronsRight";
import ButtonList from "@/components/dashboard/ButtonList";
import DefaultIcon from "@/assets/icons/DefaultIcon";
import AnalyticsIcon from "@/assets/icons/AnalyticsIcon";
import UserIcon from "@/assets/icons/UserIcon";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import {useMediaQuery} from "@/lib/useMediaQuery";

const buttons = [
    {
        id: "1",
        label: "Default",
        icon : DefaultIcon,
        path: "/dashboard/default",
        role: ["user", "guest", "admin"]
    },
    {
        id: "2",
        label: "Analytics",
        icon: AnalyticsIcon,
        path: "/dashboard/analytics",
        role: ["admin"]
    },
    {
        id: "3",
        label: "Users",
        icon: UserIcon,
        path: "",
        role: ["user", "guest"],
        childs: [
            {
                id: "3.1",
                label: "Account Profile",
                path: "",
                childs: [
                    {
                        id: "3.1.1",
                        label: "Profile 1",
                        path: "/application/users/account-profile/profile-1",
                    },
                    {
                        id: "3.1.2",
                        label: "Profile 2",
                        path: "/application/users/account-profile/profile-2",
                    }
                ]
            },
            {
                id: "3.2",
                label: "Social Profile",
                path: "/application/users/social-profile"
            }
        ],
    },
]

const Sidebar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname()
    const isMobile = useMediaQuery(768);
    const isResizingRef = useRef(false);
    const sidebarRef = useRef(null);
    const navbarRef = useRef(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "300px";
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 240px)"
            );
            navbarRef.current.style.setProperty(
                "left",
                isMobile ? "100%" : "240px"
            );
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "40px";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

  return (
          <>
              <aside
                  ref={sidebarRef}
                  className={classNames(
                      "group/sidebar h-screen overflow-y-auto bg-white relative flex w-60 flex-col z-[99999] p-2 pt-8 shadow-sm",
                      isResetting && "transition-all ease-in-out duration-300",
                      isMobile && "!absolute",
                      isMobile && isCollapsed && "!bg-transparent !shadow-none"
                  )}
              >
                  <div
                      onClick={isCollapsed ? resetWidth : collapse}
                      role="button"
                      className={classNames(
                          "h-6 w-6 hover:bg-fuchsia-50 rounded-lg absolute top-3 right-2 transition",
                      )}
                  >
                      {
                          isMobile && isCollapsed ? <BurgerIcon className="w-6 h-6" />
                              : isCollapsed ? <ChevronsRight className="h-6 w-6" /> : <ChevronsLeft className="h-6 w-6" />
                      }
                  </div>
                  <div className={
                      classNames(
                          !isCollapsed ? "mt-4 flex flex-col gap-2" : "hidden"
                      )
                  }>
                      <ButtonList buttons={buttons} level={1}/>
                  </div>
                  {
                      !isCollapsed && <div
                          onMouseDown={handleMouseDown}
                          onClick={resetWidth}
                          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-[#dedede] right-0 top-0"
                      />
                  }
              </aside>
              <div
                  ref={navbarRef}
                  className={classNames(
                      "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
                      isResetting && "transition-all ease-in-out duration-300",
                      isMobile && "left-0 w-full"
                  )}
              >
              </div>
          </>
  )
};

export default Sidebar;
