'use client'
import React, { useState } from 'react';
import "@/styles/menuArea.css"

function MenuArea({ onButtonClick }) {
  const [activeButton, setActiveButton] = useState("");

  const handleClick = (buttonId) => {     // tıkladığımız menünün id sini app.js e döndürüyor
    onButtonClick(buttonId);
    setActiveButton(buttonId);
  };

  return (
    <div className="flex w-full justify-center space-s-4 md:w-auto md:px-6 md:space-s-8">
      <button
        id='psikolog'
        className={`p-3 psikologMenu flex w-full justify-center border-b space-s-4 md:w-auto md:px-6 md:space-s-8 mb-5 ${activeButton === 'psikolog' ? 'active font-semibold' : 'font-normal' }`}
        onClick={() => handleClick('psikolog')}
      >
        <span className={`transition-all ease-out`}>Psikolog</span>
      </button>
      <button
        id='diyetisyen'
        className={`p-3 diyetisyenMenu flex w-full justify-center border-b space-s-4 md:w-auto md:px-6 md:space-s-8 mb-5 ${activeButton === 'diyetisyen' ? 'active font-semibold' : 'font-normal' }`}
        onClick={() => handleClick('diyetisyen')}
      >
        <span className={`transition-all ease-out`}>Diyetisyen</span>
      </button>
      <button
        id='sporEgitmeni'
        className={`p-3 sporEgitmeniMenu flex w-full justify-center border-b space-s-4 md:w-auto md:px-6 md:space-s-8  mb-5 ${activeButton === 'sporEgitmeni' ? 'active font-semibold' : 'font-normal' }`}
        onClick={() => handleClick('sporEgitmeni')}
      >
        <span className={`transition-all ease-out`}>Spor Eğitmeni</span>
      </button>
    </div>
  );
}

export default MenuArea;
