import Link from 'next/link';
import React from 'react';

import accordionData from './accordiondata.js';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function Faq() {
  return (
    <div id='faq' className='bg-white'>
      <div className='container mx-auto px-[6%] py-[40px] h-min-96 relative'>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-28'>
          <div className='flex flex-col gap-8 text-center mx-auto lg:w-56 lg:text-start lg:h-32'>
            <h5 className='text-2xl font-semibold '>Sıkça sorulan sorular</h5>
            <p className='text-[#0000006c]'>
              BulutKlinik Hakkında sık sorulan sorular
            </p>
            <Link
              href='#'
              className='bg-[#1A9D99] text-white font-semibold px-5 py-2 rounded-xl  w-[300px] absolute bottom-10 text-center lg:w-fit  lg:relative lg:bottom-auto '
            >
              Tümünü Gör
            </Link>
          </div>
          <div className='flex-auto col-span-2 row-span-2 mb-20 lg:w-[750px]'>
            <Accordion type='multiple' collapsible='true'>
              {accordionData.map(({ title, content }, idx) => (
                <AccordionItem value={title} key={idx}>
                  <AccordionTrigger className='text-start'>
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className='text-start'>
                    {content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
