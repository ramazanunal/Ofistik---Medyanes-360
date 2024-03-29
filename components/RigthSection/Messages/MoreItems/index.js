import React, { useRef } from 'react';
import { GrGallery } from "react-icons/gr";
import { GrDocument } from "react-icons/gr";

import useClickOutside from '@/hook/useClickOutside';
import styles from "./styles.module.css"

function MoreItems({ showMoreMenu, setShowMoreMenu, handleFileClick, handleDocumentClick }) {
  const moreRef = useRef();
  useClickOutside(moreRef, () => {
    setShowMoreMenu(false);
  });

  return (
    <div ref={moreRef} className={` ${styles.animate}  z-10 rounded-md flex flex-col   absolute md:left-[-40px] left-[-12px]  top-[-140px] border border-inputbg p-5 bg-inputMoreBg md:w-[20%] w-[40%]  `}>
      <div className="flex flex-row space-x-5  items-center cursor-pointer" onClick={handleFileClick}>
       
          <span>
          <GrGallery className='text-2xl text-premiumOrange'  />
          </span>
        
        <p className="uppercase md:text-[13px] text-xs font-[600] mt-2">Fotoğraf ve Video</p>
      </div>
      

      <div className="flex mt-5  flex-row space-x-5  items-center cursor-pointer"onClick={handleDocumentClick}>
        
          <GrDocument className='text-2xl text-premiumOrange'   />
        
        <p className="uppercase text-[13px] font-[600] mt-2">Belge</p>
      </div>
    </div>
  );
}

export default MoreItems;
