'use client';
import { useState } from 'react';
import FirstContent from '@/containers/Home/_components/first-content';
import HowToUse from '@/containers/Home/_components/howToUse';
import ALitleBitAboutUs from '@/containers/Home/_components/aLittleBitAboutUs';
import FeatureCard from '@/containers/Home/_components/FeatureCard';
import Faq from '@/containers/Home/_components/faq';
import CardSlider from '@/components/slider/cardSlider';
import WhatDoesThinks from './_components/whatDoesThinks';
import MainFeatures from './_components/MainFeatures';

const HomeContainer = () => {
  const [activeComponent, setActiveComponent] = useState('Hizmet Al');

  const changeComponent = (str) => {
    setActiveComponent(str);
  };

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
