'use client'
import React, { useState, useEffect, useRef } from 'react'

import Info from './Info'
import { useContext } from 'react'
import PhoneBookContext from '@/context/PhoneBookContext'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import SearchBar from './SearchBar'
import DropMenu from './DrowMenu'

function ChatHeader() {
  const { selectedUser, handleUserSelect } = useContext(PhoneBookContext)

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false)

  const handleInfoPanelToggle = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen)
  }

  // three dot dropdownMenu

  const handleOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch)
  }

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  const handleBackToMessages = () => {
    // Seçili kullanıcıyı null yaparak mesaj listesine dön
    handleUserSelect('')
  }
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenPhoneModal, setIsOpenPhoneModal] = useState(false)
  const [isOpenVideoCallModal, setIsOpenVideoCallModal] = useState(false)

  const searchRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Eğer tıklanan alan, search barın ref'inde değilse, search barı kapat
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpenSearch(false)
      }
      // Eğer tıklanan alan, menünün ref'inde değilse, menüyü kapat
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpenMenu(false)
      }
      // Diğer komponentleri de kontrol etmek için benzer işlemleri yapabilirsin
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef, setIsOpenSearch, menuRef, setIsOpenMenu])

  return (
    <>
      <div className="flex  ">
        <div className="fixed z-10 top-0 bg-inputbg text-favTxt w-[100%] md:w-[75%]  ">
          <div className="flex justify-between items-center w-full ">
            <div className="flex  items-center p-4">
              <div
                className="p-1  bg-premiumOrange rounded text-md font-bold mr-5 md:hidden text-backBtnTxt"
                onClick={handleBackToMessages}
              >
                <MdKeyboardArrowLeft />
              </div>
              <div className="relative" onClick={handleInfoPanelToggle}>
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute bg-dotBg w-3 h-3 rounded-full right-0 bottom-0 border border-[2px] border-inputbg"></div>
              </div>
              <div className="ml-3">
                <h2
                  className="text-md font-bold "
                  onClick={handleInfoPanelToggle}
                >
                  {selectedUser && selectedUser.name}
                </h2>
                <p className="text-personMesTxt font-[400]">
                  {selectedUser.stuation}
                </p>
              </div>
            </div>
            <div className="flex mr-10 text-chatIconBg space-x-10 text-2xl relative">
              <SearchBar
                isOpenSearch={isOpenSearch}
                setIsOpenSearch={setIsOpenSearch}
                handleOpenSearch={handleOpenSearch}
              />

              <DropMenu
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
                handleOpenMenu={handleOpenMenu}
                handleInfoPanelToggle={handleInfoPanelToggle}
                selectedUser={selectedUser}
              />
            </div>
          </div>
        </div>
      </div>

      <Info
        isInfoPanelOpen={isInfoPanelOpen}
        setIsInfoPanelOpen={setIsInfoPanelOpen}
        selectedUser={selectedUser}
      />
    </>
  )
}

export default ChatHeader
