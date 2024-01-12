'use client';
import FirstContent from '@/containers/Home/_components/first-content';
import HowToUse from '@/containers/Home/_components/howToUse';
import ALitleBitAboutUs from '@/containers/Home/_components/aLittleBitAboutUs';
import FeatureCard from '@/containers/Home/_components/FeatureCard';
import Faq from '@/containers/Home/_components/faq';
import CardSlider from '@/components/slider/cardSlider';
import { useState } from 'react';

const HomeContainer = () => {
  const [activeComponent, setActiveComponent] = useState('Hizmet Al');

  const changeComponent = (str) => {
    setActiveComponent(str);
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      <FirstContent changeComponent={changeComponent} />

      {activeComponent === 'Hizmet Al' && (
        <>
          <ALitleBitAboutUs />
          <HowToUse />
          <FeatureCard />
          <CardSlider />
          <Faq />
        </>
      )}

      {activeComponent === 'Hizmet Ver' && (
        <>
          <h1>Hizmet Ver</h1>
        </>
      )}
    </div>
  );
};

export default HomeContainer;
