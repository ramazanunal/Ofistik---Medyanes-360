'use client'
import React, { useState } from 'react'
import { BiSupport } from 'react-icons/bi'
import { RiContactsBookFill } from 'react-icons/ri'
import { Tooltip } from '@chakra-ui/react'
import DirectModal from '../DirectMessages/DirectModal'
import { useContext } from 'react'
import PhoneBookContext from '@/context/PhoneBookContext'

function Header({ onSearch, onFilterChange, filteredUser }) {
  const handleClickOption = (option) => {
    setSelectOption(option)
    onFilterChange(option) // Seçilen filtre tipini ilet
  }

  const handleInputChange = (e) => {
    onSearch(e.target.value)
  }
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleClickOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  const { handleUserSelect, selectOption, setSelectOption } =
    useContext(PhoneBookContext)

  const handleSupportOfistik = () => {
    const supportObj = {
      name: ' Ofistik Support Team', // İsim
      avatar: '/assets/images/support.jpg', // Resim URL'si
    }
    handleUserSelect(supportObj)
  }

  return (
    <div className="fixed z-40 h-[200px] bg-messageBodyBg md:w-[40%] lg:w-[25%] w-full  ">
      <div className="flex text-3xl text-messageBg space-x-3 justify-end mr-5 mt-2 opacity-80">
        <Tooltip hasArrow label="Support" placement="bottom" fontSize="sm">
          <div className="cursor-pointer " onClick={handleSupportOfistik}>
            <BiSupport className="hover:text-premiumOrange duration-300" />
          </div>
        </Tooltip>
        <Tooltip hasArrow label="New Message" placement="bottom" fontSize="sm">
          <div className="cursor-pointer">
            <RiContactsBookFill
              className="hover:text-premiumOrange duration-300"
              onClick={handleClickOpenModal}
            />
          </div>
        </Tooltip>
      </div>
      <DirectModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      <h2 className="text-xl ml-10 mt-6 mb-4 font-[500] text-messageBg ">
        Mesajlar <span className="text-premiumOrange text-sm ">(0)</span>
      </h2>

      <div className="flex  items-center w-[80%] h-12 rounded-sm focus-within:shadow-lg focus-within:outline container bg-inputbg">
        <div className="grid place-items-center h-full w-12 text-favTxt">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="outline-none placeholder:italic bg-inputbg text-sm text-gray-700 pr-2 w-full  "
          type="text"
          id="search"
          placeholder="Sohbet ara.."
          onChange={handleInputChange}
          autoComplete="off"
        />
      </div>
      <div className="h-10 w-[79%] bg-inputbg rounded-lg  ml-10 mt-2 flex  justify-between items-center">
        <div
          className={`bg-inputbg cursor-pointer  text-newMessage text-sm p-2 rounded-lg ${
            selectOption === 'inbox'
              ? 'bg-premiumOrange text-plusTxt duration-500'
              : ''
          }`}
          onClick={() => handleClickOption('inbox')}
        >
          Gelen Kutusu
        </div>
        <div
          className={`bg-inputbg cursor-pointer  text-newMessage text-sm p-2 rounded-lg ${
            selectOption === 'unread'
              ? 'bg-premiumOrange text-plusTxt duration-500'
              : ''
          }`}
          onClick={() => handleClickOption('unread')}
        >
          Okunmamış
        </div>
        <div
          className={`bg-inputbg cursor-pointer  text-newMessage text-sm p-2 rounded-lg ${
            selectOption === 'archive'
              ? 'bg-premiumOrange text-plusTxt duration-500'
              : ''
          }`}
          onClick={() => handleClickOption('archive')}
        >
          Arşiv
        </div>
      </div>
    </div>
  )
}

export default Header
