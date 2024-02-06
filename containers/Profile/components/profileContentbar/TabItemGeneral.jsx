import React from 'react'
import { PiStethoscopeFill } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";
import { LiaHospital } from "react-icons/lia";
import { LiaCertificateSolid } from "react-icons/lia";
import { GrLanguage } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
const TabItemsGeneral = ({ data }) => {
    return (
        <div className='laptop:h-[calc(100vh_-_200px)] w-full mx-auto laptop:overflow-y-scroll top-0 bottom-0  flex flex-col gap-3 pt-5   '>
            <div className='flex items-center gap-2' >
                <TfiWrite className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px]'/>
                <h1 className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' >Özgeçmiş</h1>
            </div>
            <div className='bg-white p-5 rounded-md shadow-xl text-start text-[11px]' >
                <p>
                    {data?.profile?.resume}
                </p>
            </div>
            <div className='flex items-center gap-2 mt-5' >
                <FaUserGraduate className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px]' />
                <h1 className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' >Eğitim Bilgileri</h1>
            </div>
            <div className='bg-white p-5 rounded-md shadow-lg ' >
                <ul className='w-full flex flex-col gap-3 items-start text-[11px]' >
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>Okan Üniversitesi</h1>
                        <h1>2018</h1>
                    </li>
                    <li className='w-full flex items-center justify-between'>
                        <h1 className=''>İstanbul Bilgi Üniversitesi</h1>
                        <h1>2019</h1>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-2 mt-5' >
                <LiaCertificateSolid className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium'/>
                <h1 className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' >Sertifikalar</h1>
            </div>
            <div className='bg-white p-5 rounded-md shadow-lg ' >
                <ul className='w-full flex flex-col gap-3 items-start text-[11px]' >
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>Moder Toplumlar Stres Oryantasyonu</h1>
                        <h1>2018</h1>
                    </li>
                    <li className='w-full flex items-center justify-between'>
                        <h1 className=''>Anadolu Coğrafyasındaki Piskolojik Çözünmeler</h1>
                        <h1>2019</h1>
                    </li>
                </ul>
            </div>
            <div className='flex items-center gap-2 mt-5'  >
                <PiStethoscopeFill className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' />
                <h1 className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' >Hizmet Alanı</h1>
            </div>
            <div className='bg-white p-5 rounded-md shadow-xl' >
                <ul className='flex flex-col gap-[10px] items-start text-[11px]' >
                    <li>Kaygi -Panik Atak</li>
                    <li>Baglanma Sorunlari-Bas etme becerileri</li>
                    <li className='text-start' >Fobiler-Sosyal kaygi -Özgüven problemleri-Saglik kaygisi-Uyku bozuklugu</li>
                    <li>Depresyon,Bagimlilik -Stres-Öfke Kontrolü</li>
                    <li>Obsesif Kompulsif Bozukluk-Ebeveynlik</li>
                    <li>Iliski problemleri-Degersizlik-Kendini tanima</li>
                    <li>Kaygi -Panik Atak</li>
                    <li>Baglanma Sorunlari-Bas etme becerileri</li>
                    <li className='text-start' >Fobiler-Sosyal kaygi -Özgüven problemleri-Saglik kaygisi-Uyku bozuklugu</li>
                    <li>Depresyon,Bagimlilik -Stres-Öfke Kontrolü</li>
                    <li>Obsesif Kompulsif Bozukluk-Ebeveynlik</li>
                    <li>Iliski problemleri-Degersizlik-Kendini tanima</li>
                    <li>Kaygi -Panik Atak</li>
                    <li>Baglanma Sorunlari-Bas etme becerileri</li>
                </ul>
            </div>
            <div className='flex items-center gap-2 mt-5'  >
                <GrLanguage className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium'/>
                <h1 className='text-[11px] miniTelefon:text-sm telefon:text-lg miniTablet:text-[15px] font-medium' >Diller</h1>
            </div>
            <div className='bg-white p-5 rounded-md shadow-xl' >
                <ul className='w-full flex flex-col gap-3 items-start text-[11px]' >
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>Türkçe</h1>
                        <h1>C2</h1>
                    </li>
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>İngilizce</h1>
                        <h1>C2</h1>
                    </li>
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>Almanca</h1>
                        <h1>C1</h1>
                    </li>
                    <li className='w-full flex items-center justify-between border-b pb-3'>
                        <h1>Arapça</h1>
                        <h1>C1</h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TabItemsGeneral
