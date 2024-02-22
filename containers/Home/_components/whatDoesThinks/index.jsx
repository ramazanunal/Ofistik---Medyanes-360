"use client"
import React from 'react'
import Data from './data'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FaStar, FaRegStar } from "react-icons/fa";

function WhatDoesThinks() {
  return (
    <div className='bg-thinkColor'>
      <div className='w-full  flex flex-col lg:flex-row gap-10 justify-between mx-auto container px-[6%] py-[50px] items-center'>
        <div className='text-bgGray flex flex-col gap-3'>
          <h3 className=' flex-1 text-3xl font-bold'>
            Danışanlar Terappin Hakkında Ne Diyor?
          </h3>
          <p className='text-lg'>
            Terapi yolculuğuna başlayanların %92'si Terappin'den çok memnun.
          </p>
        </div>
        <Carousel
          options={{
            dots: true
          }}
          className="w-full"
        >
          <div className='flex gap-2 justify-end  w-full'>
            <CarouselPrevious className="relative top-0 right-0 left-0 bg-contentThinkColor hover:bg-white " />
            <CarouselNext className="relative top-0 right-0 left-0 bg-contentThinkColor hover:bg-white" />
          </div>
          <CarouselContent className="gap-5 ml-0">
            {Data.map((item, index) => (
              <CarouselItem key={index} className="rounded-lg p-4 flex flex-col justify-between bg-contentThinkColor text-thinkColor min-h-44">
                <div>
                  <div className='flex'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < item.starPoint ? <FaStar className='fill-amber-400' /> : <FaRegStar className='fill-gray-400' />}
                      </span>
                    ))}
                  </div>
                  <p className='py-3 pr-10'>{item.desc}</p>
                </div>
                <h4 className='border-t pt-1'>{item.userName} | {item.starPoint}</h4>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export default WhatDoesThinks