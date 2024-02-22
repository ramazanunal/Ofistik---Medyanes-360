"use client"
import FirstContent from '@/containers/Home/_components/first-content';
import HowToUse from '@/containers/Home/_components/howToUse';
import ALitleBitAboutUs from '@/containers/Home/_components/aLittleBitAboutUs';
import FeatureCard from '@/containers/Home/_components/FeatureCard';
import Faq from '@/containers/Home/_components/faq';
import CardSlider from '@/components/slider/cardSlider';
import WhatDoesThinks from './_components/whatDoesThinks';
import MainFeatures from './_components/MainFeatures';
import { useHomeStore } from '@/store/HomeStore';

const  HomeContainer =  () => {
   const activeComponent =  useHomeStore((state) => state.activeComponent);
  const changeComponent =  useHomeStore((state) => state.setActiveComponent);

  return (
    <div className='flex flex-col h-full bg-white'>
      <FirstContent activeComponent={activeComponent} changeComponent={changeComponent} />
      <ALitleBitAboutUs activeComponent={activeComponent} />
      <HowToUse activeComponent={activeComponent} />
      <FeatureCard activeComponent={activeComponent} />
      <WhatDoesThinks />
      <MainFeatures />
      {activeComponent === 'Hizmet Al' && (
        <>
          <CardSlider />
        </>
      )}

      {activeComponent === 'Hizmet Ver' && (
        <>
        </>
      )}

      <Faq activeComponent={activeComponent} />
    </div>
  );
};

export default HomeContainer;
