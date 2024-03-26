import React,{useRef} from 'react'
import { IoSearch } from "react-icons/io5";
import useClickOutside from '@/hook/useClickOutside';

function SearchBar({isOpenSearch, handleOpenSearch, setIsOpenSearch}) {
const searchRef = useRef()
  useClickOutside (searchRef, ()=> {
    setIsOpenSearch(false)
  })
  return (
    <div ref={searchRef} >
    <IoSearch  onClick={handleOpenSearch} className="cursor-pointer" />
      {isOpenSearch && (
    
          <div  className="absolute md:w-[350px] w-[200px] h-15 bg-inputbg border border-messageCountBgs  top-10 md:right-[80px] right-[70px] p-3 rounded">
            <input
              type="search"
              placeholder="Search..."
              className="text-[15px] px-3 py-2 w-full border rounded focus-within:outline-personMesTxt "
            />
          </div>
    
      )}
    </div>
  )
}

export default SearchBar