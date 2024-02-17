'use client'
import { useState } from 'react'
import { mainFeatures } from './data'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

function MainFeatures() {
    const [selectedFeature, setSelectedFeature] = useState("Randevu Yönetimi");

    const handleFeatureClick = (feature) => {
        setSelectedFeature(feature.title)
    }

    const selectedFeatureData = mainFeatures.find((feature) => feature.title === selectedFeature)

    return (
        <div id='mainFeatures' className='bg-darkgreen/20'>
            <div className='md:container md:mx-auto py-14 space-y-10 '>
                <div className='space-y-3'>
                    <h1 className='text-2xl font-semibold '>Öne Çıkan Özellikler</h1>
                    <p className='font-light text-textGray/60'>Klinik yönetimi ve hasta takibi için ihtiyaç duyacağınızdan fazlası</p>
                </div>
                <div className='flex items-center overflow-x-auto h-fit w-full px-2 md:px-0'>
                    {mainFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={twMerge('group relative flex flex-col gap-4 items-center py-3 min-w-[167px] border-b mb-2 cursor-pointer  h-full w-full after:w-0 after:transition-all after:duration-500 after:ease-in-out after:absolute after:rounded-full', `${(selectedFeatureData.title == feature.title) && "after:absolute after:-bottom-0.5 after:w-full after:h-1 after:bg-gabiGreen"}`)}
                            onClick={() => handleFeatureClick(feature)}>
                            <div className=' bg-white rounded-3xl w-fit h-fit p-7 text-gabiGreen/90'>
                                <feature.icon size={32} />
                            </div>
                            <span className={twMerge(`group-hover:text-black text-textGray font-semibold text-sm whitespace-nowrap transition-colors duration-200`, `${(selectedFeatureData.title == feature.title) && "text-black"}`)}>{feature.title}</span>
                        </div>
                    ))}
                </div>
                <div className='md:container md:mx-auto mx-5'>
                    {selectedFeatureData &&
                        <div className='flex flex-col md:flex-row flex-nowrap gap-16 drop-shadow-xl'>
                            <div className='w-full md:w-1/3 space-y-5'>
                                <div className='text-2xl font-semibold text-gabiGreen'>{selectedFeatureData.title}</div>
                                <div className='text-lg font-semibold'>{selectedFeatureData.description}</div>
                                <div className='text-sm text-grayButton/90'>{selectedFeatureData.detailsDescription}</div>
                            </div>
                            <div className='relative flex justify-center w-full md:w-2/3  rounded-2xl transition-all duration-300 '>
                                <div className='relative w-5/6 h-[fit] sm:h-[28rem] pt-[50px] pb-[15px] px-[15px] rounded-2xl bg-white'>
                                    <div className='absolute top-5 left-5 flex gap-2.5'>
                                        <div className='w-3 h-3 rounded-full bg-gray-300'></div>
                                        <div className='w-3 h-3 rounded-full bg-gray-300'></div>
                                        <div className='w-3 h-3 rounded-full bg-gray-300'></div>
                                    </div>
                                    <Image className=' w-full h-full' src={selectedFeatureData.image} width={1920} height={1080} />
                                </div>
                                <div className='hidden sm:block space-y-5 p-5 bg-white h-fit rounded-xl absolute transition-all duration-200 left-0 bottom-1/2 md:-translate-y-1/2 lg:translate-y-1/2 drop-shadow-lg'>
                                    <div className='flex items-center flex-nowrap gap-5 '>
                                        <div className=' bg-gabiGreen/40 rounded-lg w-fit h-fit p-3 text-white'>
                                            <selectedFeatureData.icon size={20} />
                                        </div>
                                        <div className='whitespace-nowrap'>
                                            {selectedFeatureData.cardOne.title}
                                        </div>
                                    </div>
                                    <div className='text-sm text-textGray'>
                                        {selectedFeatureData.cardOne.description}
                                    </div>
                                </div>
                                <div className=' hidden sm:flex items-end absolute right-0 bottom-1/3 translate-y-1/2'>
                                    <div className='relative w-[40px] h-[40px]  drop-shadow-lg'>
                                        <Image className='rounded-full' src={selectedFeatureData.cardTwo.image} width={40} height={40} />
                                    </div>
                                    <div className='w-fit h-fit p-5 space-y-2 bg-white rounded-t-xl rounded-br-xl mb-2 ml-2 rounded-bl-[2px] drop-shadow-lg'>
                                        <div className='font-semibold text-sm whitespace-nowrap'>{selectedFeatureData.cardTwo.title}</div>
                                        <div className='text-sm font-light text-textGray'>{selectedFeatureData.cardTwo.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainFeatures