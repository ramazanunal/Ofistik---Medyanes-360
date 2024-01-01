import React from 'react'
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className='flex w-full items-center h-fit p-2'>
        <Image src="/terappinPurple.svg" width={100} height={50} objectFit="contain" className="ml-4 md:ml-0"/>
    </nav>
  )
}

export default Navbar
