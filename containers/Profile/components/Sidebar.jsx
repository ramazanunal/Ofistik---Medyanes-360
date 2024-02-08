import React from 'react'
import { IoMdClose } from "react-icons/io";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { PiStethoscopeFill } from "react-icons/pi";
import { PiCopyLight } from "react-icons/pi";
import { IoDocumentOutline } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";

const SidebarMenu = ({ isOpenSideMenu, setIsOpenSideMenu }) => {
    return (
        <div className={!isOpenSideMenu ? 'border block ld:hidden fixed top-0 right-0 w-[100%] sm:w-[60%] h-full bg-white duration-1000  ' : "fixed h-full w-[60%] top-0 right-[-100%] duration-1000  "}>
            <div className='flex items-center justify-between p-7' >
                <h1 className='text-xl font-semibold text-gray-800'>Menu</h1>
                <IoMdClose onClick={()=>{setIsOpenSideMenu(true)}} className='text-customRed opacity-90' size={35} />
            </div>
            <ul className=' text-start font-bold cursor-pointer px-7 pb-5 '>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <FiUserPlus size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Kayıt Ol</h1>
                </li>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <FiUserCheck size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Giriş</h1>
                </li>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <PiStethoscopeFill size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Kurumlar</h1>
                </li>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <PiCopyLight size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Blog</h1>
                </li>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <IoDocumentOutline size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Hakkımızda</h1>
                </li>
                <li className='flex items-center gap-5 border-b py-6 '>
                    <RiEditBoxLine size={25} className='text-gray-800' />
                    <h1 className='text-gray-800 font-light'>Yardım</h1>
                </li>
            </ul>
        </div>

    )
}

export default SidebarMenu
