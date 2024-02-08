import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { generateAvailabilityData } from "@/lib/utilities/dayGenerator";

const DatePickerStep = ({ selectedTime, setSelectedTime, selectedDate, setSelectedDate }) => {

  const handleSelectDate = (date) => {
    const dateFormatted = formatSelectedDate(date);
    setSelectedDate(dateFormatted);
    // Burada seçilen tarih ile ilgili diğer işlemleri yapabilirsiniz.
  };

  const handleSelectTime = (selectedTimeString, isAvailable) => {
    if (isAvailable) {
      setSelectedTime(selectedTimeString);
      // Burada seçilen zaman ile ilgili diğer işlemleri yapabilirsiniz.
    }
  };

  const formatSelectedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Aylar 0'dan başlar, bu yüzden 1 ekleyin
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Örnek kullanım
  const startDate = "12/12/2023";
  const days = 15;
  const availabilityData = generateAvailabilityData(startDate, days);


  return (
    <div className='flex flex-col gap-1 items-start'>
      <h1 className='text-tertiaryBlue font-semibold text-center'>Tarih Seçiniz</h1>
      <div className='grid grid-cols-3 gap-1 w-full max-w-[300px] mx-auto text-white font-semibold justify-items-center'>
        {availabilityData && availabilityData.map(({ date, availability }) => (
          date === selectedDate ? (
            availability.map(({ time, isAvailable }) => (
              <div
                key={time}
                className={`col-span-1 w-20 text-xs rounded-2xl py-1 cursor-pointer hover:opacity-90 ${isAvailable ? (selectedTime === time ? 'bg-primaryGreen' : 'bg-primaryGray') : 'bg-primaryBlue'
                  }`}
                onClick={() => handleSelectTime(time, isAvailable)}
              >
                {time}
              </div>
            ))
          ) : null
        ))}
      </div>
      <div className='w-full flex items-center justify-center sm:p-5'>
        <Calendar className={'custom-calendar'} onChange={handleSelectDate} />
      </div>
      <div className='text-xs text-textGray'>*** Randevu Süresi 60 dk</div>
    </div>
  );
};

export default DatePickerStep;
