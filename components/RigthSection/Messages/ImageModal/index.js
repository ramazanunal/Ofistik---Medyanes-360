import React from 'react'
import { IoMdDownload } from "react-icons/io";
import styles from "./styles.module.css"
import { IoClose } from "react-icons/io5";
import { GoDash } from "react-icons/go";


function ImageModal({ imageUrl, onClose }) {
  return (
    <div className="fixed z-50 left-0 top-0 bg-modalOutBg bg-opacity-50 w-screen h-screen flex justify-center items-center" onClick={onClose}>
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-messageBodyBg bg-opacity-50 p-6 rounded-lg relative">
        <img src={imageUrl} alt="Modal" className="w-[400px] h-[580px]" />
        <span
          className={styles.closeImage}
          onClick={onClose}
        >
        <div className="flex flex-row justify-between items-center">
        <div >
          <div className="w-4 h-4 rounded-md p-2 cursor-pointer transition-all duration-700 relative  bg-closeBtnBg bg-opacity-50 hover:bg-closeHoverBtnBg group">
            <IoClose
              size={10}
              className="text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <GoDash
              size={10}
              className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
        </span>
        <a
        href={imageUrl}
        download="image"
        className={styles.downloadLink}
      >
        <IoMdDownload />
      </a>
      </div>
    </div>
  </div>
  )
}

export default ImageModal