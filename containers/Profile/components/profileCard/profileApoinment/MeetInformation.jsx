import React from 'react'
import { TiTick } from "react-icons/ti";
import { IoIosWarning } from "react-icons/io";
const MeetInformation = ({ meetingInformation }) => {
    return (
        <div>
            <h1 className='text-tertiaryBlue font-semibold text-start pb-5' >Randevu Bilgileri</h1>
            {Object.values(meetingInformation).some(value => value === "") ? (
                <div className='w-full bg-tertiaryBlue px-4 py-5 text-gray-300 text-xs rounded-md'>
                    <div className='w-full flex items-center justify-center'>
                        <IoIosWarning size={50} className='text-warningColor' />
                    </div>
                    <div className='py-2'>Randevu bilgileriniz eksik! Lütfen gerekli tüm alanları doldurun.</div>
                </div>
            ) : (
                <div className='w-full bg-tertiaryBlue px-4 py-5 text-gray-300 text-xs rounded-md'>
                    <div className='w-full flex items-center justify-center'>
                        <TiTick size={50} className='text-primaryGreen' />
                    </div>
                    <div className='py-2'>Randevunuz onaylandı! Aşağıdaki detaylarla ilgili bilgi alabilirsiniz:</div>
                    <div className='flex flex-col gap-3 justify-center font-semibold text-white text-xs py-5'>
                        <div className='   flex flex-col gap-3 justify-center font-semibold text-white  text-xs py-5' >
                            <div className='w-full flex gap-3 items-center ' >
                                <h1 className='font-semibold' >Ad Soyad:</h1>
                                <h1>{meetingInformation.name}</h1>
                            </div>
                            <div className='flex gap-3 items-center ' >
                                <h1>Tarih:</h1>
                                <h1>{meetingInformation.date}</h1>
                            </div>
                            <div className='flex gap-3 items-center ' >
                                <h1>Randevu Saati:</h1>
                                <h1>{meetingInformation.time}</h1>
                            </div>
                            <div className='flex gap-3 items-center ' >
                                <h1>Terapi Türü:</h1>
                                <h1>{meetingInformation.kindOfTherapy}</h1>
                            </div>
                            <div className='flex  gap-1 items-start justify-start ' >
                                <h1>Danışan Mesajı:</h1>
                                <h1>{meetingInformation.message}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default MeetInformation