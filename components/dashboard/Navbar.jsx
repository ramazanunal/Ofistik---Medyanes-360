import React from 'react'
import Image from "next/image";
import Terrappin from "@/assets/icons/terrappin";

const Navbar = () => {
  return (
    <nav className='flex w-full items-center h-fit px-2'>
        <div className="ml-4 md:ml-0">
            <Terrappin color="#322460" width={100}/>
        </div>
    </nav>
  )
}

export default Navbar
