"use client";
import React, {useRef } from "react";
import { IoClose } from 'react-icons/io5';
import { GoDash } from 'react-icons/go';
import styles from "./styles.module.css";
import PhoneBook from "@/components/PhoneBook";


import useClickOutside from "@/hook/useClickOutside";

import { useContext } from "react";
import PhoneBookContext from "@/context/PhoneBookContext";

function ChannelsModal({
  channelOpenModal,
  setChannelOpenModal,
  setIsOpenModal,
  isOpenModal,
}) {
  const { showCheckBox } = useContext(PhoneBookContext);

  const channalRef = useRef();
  useClickOutside(channalRef, () => {
    setChannelOpenModal(false);
  });
  const handleClickOpenNewMessageModal = () => {
    setIsOpenModal(!isOpenModal);
    setChannelOpenModal(false);
  };

  return (
    <>
      <div
        className={`fixed z-50  left-0 top-0 bg-modalOutBg bg-opacity-50 w-screen h-screen   justify-center items-center ${
          channelOpenModal ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="bg-messageBodyBg rounded-t rounded-b shadow-md md:w-[40%] w-[80%] flex flex-col">
      



          <div className="bg-messageBodyBg p-2    shadow-md  w-[100%] flex justify-between">
          <div className="flex justify-center my-5 flex-wrap text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
             
              <button
              className="px-4 py-2 mx-2 text-gray-400  border-b-2 border-gray-300 "
              onClick={handleClickOpenNewMessageModal}
            >
                Yeni Mesaj
              </button>
              <button
                className="px-4 py-1 mx-2 text-premiumOrange border-b-2 border-premiumOrange"
              >
                Yeni Toplu Mesaj
              </button>
            </div>

          <div className='flex flex-row justify-between items-center'>
               
          <div onClick={()=> setChannelOpenModal(false)}>
            <div className='w-10 h-10 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-closeBtnBg bg-opacity-50 hover:bg-closeHoverBtnBg group'>
              <IoClose
                size={30}
                className='text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
              <GoDash
                size={30}
                className='text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
            </div>
          </div>
        </div>
            
          </div>
          <div className="bg-premiumOrange rounded-tr flex justify-between items-center  pl-3 py-5 top-0 w-full">
            <div className="text-plusTxt font-bold text-md">
              Yeni Toplu Mesaj Oluştur
            </div>
            
          </div>
          <div className="flex flex-col bg-messageBodyBg text-personMesTxt  w-[100%]  py-5 px-4 ">
            
            users
          </div>
          <div className="flex  flex-col bg-messageBodyBg text-personMesTxt  w-[100%]   px-4 ">
            <h2 className="font-semibold mb-1">Kişi Seç</h2>
          </div>

          <div className={`${styles.contactsContainer} border md:ml-10 ml-8 `}>
            <h2 className=" font-[600] text-sm text-modalOutBg bg-inputbg p-2  w-full">
              Rehber
            </h2>
            <PhoneBook showAvatar={false} showCheckBox={showCheckBox} />
          </div>

          <div className="flex rounded flex-col bg-messageBodyBg    w-[90%] md:ml-7 ml-4    my-4 px-4 ">
            <h2 className="font-semibold mb-3">Mesaj</h2>
            <textarea
              cols="2"
              rows="2"
              placeholder="Mesaj Yazınız..."
              className="p-3 placeholder:italic focus-within::outline border-modalInputBorder bg-inputbg border-opacity-45"
            ></textarea>
          </div>

       
          <div className="flex justify-end items-center pr-8 py-5  w-full rounded-b">
           
            <div className=" py-4 px-5 cursor-pointer bg-premiumOrange text-modalSendTxt rounded">
             Toplu Mesaj Gönder
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelsModal;
