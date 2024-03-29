import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import { MdCloudUpload } from "react-icons/md";
import { IoSend, IoAddCircle } from "react-icons/io5";
import useClickOutside from "@/hook/useClickOutside";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GoDash } from "react-icons/go";


function File({ fileOpenModal, setFileOpenModal, onSendClick }) {
  const fileRef = useRef();
  useClickOutside(fileRef, () => {
    setFileOpenModal(false);
  });

  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFiles([
      ...files,
      {
        name: selectedFile.name,
        type: selectedFile.type,
        data: URL.createObjectURL(selectedFile),
      },
    ]);
    
  };

  const handleSendClick = () => {
    const filesData = files.map((file) => file.data);
    const dataToSend = {
      message: message,
      files: filesData
    };
    onSendClick(dataToSend);
    setFileOpenModal(false);
    setFiles([]);
    setMessage("");
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((file, index) => index !== indexToRemove));
  };


  

  return (
    <>
      <div
        className={`fixed z-50 left-0 top-0 bg-modalOutBg bg-opacity-50 w-screen h-screen justify-center items-center ${
          fileOpenModal ? "flex" : "hidden"
        }`}
      >
        <div
          ref={fileRef}
          className="bg-inputbg rounded-t p-2 rounded-b shadow-md md:w-[500px] w-[300px] flex flex-col justify-center items-center"
        >
          <div 
            onClick={() => setFileOpenModal(false)}
            className="flex cursor-pointer justify-end mb-2 font-semibold w-full pr-5 text-messageBg"
          >
          <div className="flex justify-end items-end">
          <div onClick={() => setFileOpenModal(false)}>
           <div className="w-6 h-6 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-closeBtnBg bg-opacity-50 hover:bg-closeHoverBtnBg group">
             <IoClose
               size={20}
               className="text-red-500 transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             />
             <GoDash
               size={20}
               className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
             />
           </div>
         </div>
         </div>
        
          </div>
          <form
            className={`${styles.form} md:w-[450px] w-[300px]  `}
            onClick={() => {
              if (files.length === 0) {
                document.querySelector(".input-field").click();
              }
            }}
          
          >
         {
          files.length  === 0 &&  <input
          
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={handleFileChange}
        />
         }
            <div className="flex flex-wrap justify-center">
              {files.map((file, index) => (
                <div  key={index} className="m-1 relative">
                  <img
                    src={file.data}
                    width={100}
                    height={100}
                    alt={file.name}
                    className="w-35 h-35"
                  />
                  <div
                    className={styles.delete}
                    onClick={() => removeFile(index)}
                  >
                    <FaTrash/>
                  </div>
                </div>
              ))}
            </div>
            {files.length === 0 && (
              <>
              
                <MdCloudUpload color="hsl(7, 90%, 64%)" size={60} />
                <p className="text-messageBg">Fotoğraf seçiniz..</p>
                <p className="opacity-30 text-xs">(Fotoğraf seçmek için artı butonuna basınız)</p>
              </>
            )}
          </form>

          <section className="flex w-full space-x-2 mx-2 my-2 justify-between items-center px-5 py-4 rounded-sm bg-inputbg text-messageBg">
            <div className="w-full">
              <input
                placeholder="Mesaj yazınız..."
                type="text"
                className="w-full bg-messageBodyBg text-sm py-2 px-3 rounded-3xl"
                value={message}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <div
                className="p-1 cursor-pointer bg-premiumOrange text-modalSendTxt rounded mr-2"
                onClick={handleSendClick}
              >
                <IoSend />
              </div>
              <label
                htmlFor="file-upload"
                className="p-1 cursor-pointer bg-premiumOrange text-modalSendTxt rounded"
              >
                <IoAddCircle />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default File;
