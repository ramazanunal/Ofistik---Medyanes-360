import React from 'react'
import Image from "next/image";
import Terrappin from "@/assets/icons/terrappin";

const Navbar = () => {
  return (
    <nav className='flex w-full items-center h-fit px-2'>
        <Terrappin color="#322460" width={100}/>
    </nav>
  )
}

export default Navbar
