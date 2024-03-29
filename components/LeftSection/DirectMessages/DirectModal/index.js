"use client";
import React, { useState, useRef } from "react";
import styles from "./styles.module.css";

import { IoClose } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import PhoneBook from "@/components/PhoneBook";
import users from "@/public/assets/data/users.json";
import ChannelsModal from "../../ChannelsModal";


import { useContext } from "react";
import PhoneBookContext from "@/context/PhoneBookContext";

function DirectModal({ isOpenModal, setIsOpenModal }) {
  const { showAvatar } = useContext(PhoneBookContext);

  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state

  // Filtreleme fonksiyonu
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const [channelOpenModal, setChannelOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setChannelOpenModal(!channelOpenModal);
    setIsOpenModal(false);
  };

  return (
    <>
      <div
        className={`fixed z-50  left-0 top-0 bg-modalOutBg bg-opacity-50 w-screen h-screen   justify-center items-center ${
          isOpenModal ? "flex flex-col" : "hidden"
        }`}
      >
        <div className="bg-modalBg rounded-t rounded-b shadow-md md:w-[40%] w-[80%] flex flex-col">
          <div className="bg-modalBg p-2     shadow-md  w-[100%] flex justify-between">
            <div className="flex justify-center my-5 flex-wrap text-sm md:text-[1.2vw] lg:text-[1.1vw] xl:text-[1vw]">
              <button
                className="px-4 py-1 mx-2 text-premiumOrange border-b-2 border-premiumOrange"
              >
                Yeni Mesaj
              </button>
              <button
                className="px-4 py-2 mx-2  border-b-2  "
                onClick={handleClickOpenModal}
              >
                Yeni Toplu Mesaj
              </button>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div onClick={() => setIsOpenModal(false)}>
                <div className="w-10 h-10 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-closeBtnBg bg-opacity-50 hover:bg-closeHoverBtnBg group">
                  <IoClose
                    size={30}
                    className="text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                  <GoDash
                    size={30}
                    className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-premiumOrange  flex justify-between items-center  pl-3 py-5 top-0 w-full">
            <div className="text-plusTxt font-bold text-md">Rehber</div>
          </div>
          <div className="flex  w-[100%] bg-messageBodyBg py-5 px-4 ">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" border border-modalInputBorder border-opacity-45 placeholder:italic focus-within:outline bg-plusTxt text-sm text-gray-700 px-2 rounded py-3  w-full  "
              type="text"
              id="searchUser"
              placeholder="Kişi Ara.."
            />
          </div>
          <div className={styles.contactsContainer}>
            <h2 className="ml-11 font-[600] text-sm text-modalContactTxt">
              Rehber
            </h2>
            <PhoneBook
              showAvatar={showAvatar}
              showCheckBox={false}
              filteredUsers={filteredUsers}
              setIsOpenModal={setIsOpenModal}
            />
          </div>

          <div className="flex justify-end  items-center pr-8 py-5   w-full rounded-b">
            <div className="border py-4 px-5 cursor-pointer bg-premiumOrange text-plusTxt rounded">
              <IoSend />
            </div>
          </div>
        </div>
      </div>

      <ChannelsModal
        channelOpenModal={channelOpenModal}
        setChannelOpenModal={setChannelOpenModal}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </>
  );
}

export default DirectModal;
