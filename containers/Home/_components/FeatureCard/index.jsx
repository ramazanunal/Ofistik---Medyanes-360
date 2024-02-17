'use client';
import { featureCardHizmetAl, featureCardHizmetVer } from './datas.js';
import Image from 'next/image';

function FeatureCard({ activeComponent }) {
  const datas = (activeComponent === 'Hizmet Al' ? featureCardHizmetAl : featureCardHizmetVer);

  return (
    <section className='container flex gap-6 my-6 justify-center flex-col md:flex-row  py-12'>
      {datas.map((data) => (
        <div
          className='  flex flex-row gap-4 md:flex-col md:p-5 md:pl-0 md:mb-16  items-center max-w-full   md:max-w-[15rem] max-h-fit md:max-h-52 '
          key={data.id}
        >
          {/* Icon */}
          <div className='flex justify-center items-center  md:pr-0 md:pt-0'>
            {data.photoUrl ? (
              <Image
                src='https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/good-icon.png'
                unoptimized
                alt={data.title}
                width={60}
                height={60}
                className='rounded-full'
              />
            ) : (
              data.icon
            )}
          </div>
          {/* Title and Description */}
          <div className='flex flex-col'>
            <h2 className='text-md font-medium tracking-tight mt-10 md:text-center'>
              {data.title}
            </h2>
            <p className='text-sm text-gray-400 mt-3 md:text-center'>
              {data.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default FeatureCard;
