"use client";
import React, { useState, useRef } from "react";
import styles from "./styles.module.css"
import { IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArchive } from "react-icons/fa";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import useClickOutside from "@/hook/useClickOutside";


function Info({ isInfoPanelOpen, setIsInfoPanelOpen, selectedUser }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);


  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // info modalı dışında bir tıklama olursa modalı kapatması için bir bileşen

  const infoRef = useRef()
  useClickOutside (infoRef, ()=> {
    setIsInfoPanelOpen(false)
  })
  return (
    <>
      <div
      ref={infoRef}
        className={`fixed ${styles.animate} z-50  right-0 md:top-16 top-0   md:w-[25%] w-full justify-end items-start h-screen md:h-auto ${
          isInfoPanelOpen ? "flex" : "hidden"
        }`}
      >
        <div className="rounded-t rounded-b shadow-md bg-infoModalBg  w-[100%] flex flex-col justify-center items-center relative">
          <div className="relative text-2xl">
            <img
              src={selectedUser.avatar}
              className="w-full h-72 p-3 rounded-2xl"
              alt=""
            />
            <div className="absolute flex top-6 left-6 text-plusTxt">
              <div>
                <IoClose onClick={() => setIsInfoPanelOpen(false)} className="cursor-pointer" />
              </div>
            </div>
            <div className="absolute flex top-6 right-6 text-plusTxt">
              <div>
                <BsThreeDotsVertical onClick={handleOpenMenu} className="cursor-pointer"/>
              </div>
              {isOpenMenu && (
                <div className="absolute right-2 top-10 text-sm font-[500] text-threeDotMenuTxt bg-threeDotMenu shadow-md rounded">
                  <div className="flex justify-between px-6 py-2 hover:bg-threeDotMenuHover cursor-pointer">
                    <span>Archive</span>
                    <FaArchive className="ml-6" />
                  </div>
                  <div className="flex justify-between px-6 py-2  hover:bg-threeDotMenuHover cursor-pointer">
                    <span>Muted</span>
                    <AiOutlineAudioMuted className="ml-6" />
                  </div>
                  <div className="flex justify-between px-6 py-2  hover:bg-threeDotMenuHover cursor-pointer">
                    <span>Delete</span>
                    <RiDeleteBin6Line className="ml-6" />
                  </div>
                </div>
              )}
            </div>

             <div className="absolute flex-col bottom-6 left-8 text-sm text-plusTxt">
            <p className="font-semibold">{selectedUser.name}</p>
            <div className="flex items-center">
              <div className="bg-dotBg w-3 h-3 mr-3 rounded-full "></div>
              <p className="opacity-60 "> {selectedUser.stuation}</p>
            </div>
          </div>
          </div>
          <div className="border border-solid border-messageBodyBg opacity-35 w-full"></div>
          <div className="overflow-y-auto overflow-hidden md:min-h-[400px] md:max-h-[500px] text-textInfo  min-h-[500px] max-h-[500px]">
          
         <div className="p-5 ">
          <h2 className="opacity-60 uppercase text-sm font-semibold  mb-3">Status :</h2>
          <p className="opacity-45 font-[500]">{selectedUser.status}</p>
          </div>
          <div className="p-8">
                <h2 className=" opacity-60 uppercase mb-3 ">Info : </h2> 
                <div className="flex  space-x-3 mb-5">
                  <FiUser className="opacity-60"/> <h5 className="font-[500]">{selectedUser.name}</h5>
                </div>
                <div className="flex space-x-3 mb-5">
                  <MdOutlineMail className="opacity-60"/> <h5 className="font-[500]">{selectedUser.email}</h5>
                </div>
                <div className="flex space-x-3 mb-5">
                  <MdOutlineLocalPhone className="opacity-60"/> <h5 className="font-[500]">{selectedUser.phone}</h5>
                </div>
                <div className="flex space-x-3 mb-5">
                  <IoLocationOutline className="opacity-60"/> <h5 className="font-[500]">{selectedUser.locationCity}, {selectedUser.locationCountry} </h5>
                </div>
          </div>
         
         </div>
         
         
        </div>
      </div>
    </>
  );
}

export default Info;
