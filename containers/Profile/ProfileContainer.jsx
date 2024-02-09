"use client"
import React, { useState, useRef } from 'react';
import useAlert from "@/lib/hooks/useAlert";

// Components
import ProfileDetail from "./components/profileContentbar/ProfileContentbar";
import Meeting from "./components/profileCard/profileApoinment/Meeting";
import ProfileCardInfo from "./components/profileCard/profileCardInfo/ProfileCardInfo";
import Alert from "@/components/Alert";

//Icons
import { IoCopy } from 'react-icons/io5';


const socialMediaItems = [
    {
        icon: 'https://img.icons8.com/3d-fluency/94/instagram-new.png',
        alt: 'instagram-new',
        nickname: '@gabriel02',
        isUrl: false,
    },
    {
        icon: 'https://img.icons8.com/ios-filled/50/twitterx--v1.png',
        alt: 'twitter',
        nickname: '@gabriel02',
        isUrl: false,
    },
    {
        icon: 'https://img.icons8.com/color/48/facebook.png',
        alt: 'facebook',
        nickname: '@gabriel02face',
        isUrl: false,
    },
    {
        icon: 'https://img.icons8.com/ios-filled/50/link--v1.png',
        alt: 'link',
        nickname: 'Profil Link',
        isUrl: true,
    },
];


const ProfilePageLayout = ({ data }) => {

    const [isHearted, setIsHearted] = useState(false); //Hert button control in profile
    const [isCommented, setIsCommented] = useState(false);//Comment icon opening and update control
    const [isFollow, setIsFollow] = useState(false); //Social media field opening control
    const [detailControl, setDetailControl] = useState("general");

    const socialRef = useRef();
    const textRef = useRef();

    const { alertMessage, showAlert, alertVisible, alertType } = useAlert();

    // Click and copy text
    const handleCopySocialMediaNickMame = () => {
        textRef.current
            ? navigator.clipboard.writeText(textRef.current.innerText)
            : null;

        showAlert('Kopyalandı!', 'success');
    };

    // Click and copy text
    const handleCopySocialMediaUrlAddress = () => {
        textRef.current
            ? navigator.clipboard.writeText('www.example.com')
            : null;

        showAlert('Kopyalandı!', 'success');
    };

    return (
        <div className=' tablet:fixed bg-bgGray w-full  mx-auto  z-0 pt-20 tablet:pt-28 pb-10'>
            <div className=' max-w-[584px] w-full  miniTablet:max-w-[768px] tablet:max-w-[1920px] mx-auto flex  flex-col items-center telefon:items-start tablet:flex-row  gap-5 text-center px-5 laptop:px-10'>
                <div id='fake-window' className=' tablet:h-[calc(100vh_-_140px)] overflow-y-auto bg-white w-full tablet:w-2/5 laptop:max-w-[600px] p-3 border shadow-lg rounded-3xl'>
                    <ProfileCardInfo
                        data={data}
                        isHearted={isHearted}
                        setIsHearted={setIsHearted}
                        detailControl={detailControl}
                        setDetailControl={setDetailControl}
                        setIsCommented={setIsCommented}
                        isCommented={isCommented}
                        isFollow={isFollow}
                        setIsFollow={setIsFollow}
                        socialRef={socialRef}
                    />
                    <div
                        className={`${isFollow
                            ? 'flex flex-col items-center justify-center shadow-lg p-3 w-full transition-all duration-300 ease-in-out bg-white text-black rounded-lg z-50 mt-3'
                            : 'overflow-hidden transition-all h-0 duration-300 ease-in-out'
                        }`}
                    >
                        <Alert
                            alertVisible={alertVisible}
                            alertMessage={alertMessage}
                            alertType={alertType}
                        />
                        <div
                            className={`flex items-center justify-around overflow-x-auto gap-1 w-full ${isFollow ? 'h-20' : 'overflow-hidden transition h-0'}`}
                        >
                            {socialMediaItems && socialMediaItems.map((item, index) => (
                                <div
                                    key={index}
                                    className='group relative flex flex-col items-center gap-1 hover:scale-105 duration-300 cursor-pointer p-1'
                                >
                                    <div className='relative'>
                                        <img
                                            src={item.icon}
                                            alt={item.alt}
                                            className="object-contain h-[20px]"
                                        />
                                        <IoCopy
                                            size={13}
                                            onClick={
                                                item.isUrl
                                                    ? handleCopySocialMediaUrlAddress
                                                    : handleCopySocialMediaNickMame
                                            }
                                            className='absolute left-9 top-0 hidden hover:opacity-80 group-hover:block duration-300 transition-all'
                                        />
                                    </div>
                                    <h1
                                        ref={textRef}
                                        className='text-[8px] miniTelefon:text-xs font-semibold hover:scale-100'
                                    >
                                        {item.nickname}
                                    </h1>

                                </div>
                            ))}
                        </div>
                    </div>
                    <Meeting />
                </div>
                <div className='w-full tablet:w-3/5 flex items-center justify-center pt-3 text-tertiaryBlue'>
                    <ProfileDetail
                        data={data}
                        detailControl={detailControl}
                        setDetailControl={setDetailControl}
                        setIsCommented={setIsCommented}
                        isCommented={isCommented}
                        isFollow={isFollow}
                        setIsFollow={setIsFollow}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfilePageLayout
