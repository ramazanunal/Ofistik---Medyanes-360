import React from 'react'

function Header({headerText,headerText2,headerText3}) {
    return (
        <div>
            <div className='text-[20px] lg:text-[64px] head mt-10 md:mt-20 text-headTxt1 '>
                {headerText}
                <br/>
                {headerText2} <span className='text-headTxt2'>{headerText3}</span>
            </div>
        </div>
    )
}

export default Header
