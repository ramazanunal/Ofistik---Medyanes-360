import React from 'react';

const InformationForm = ({ setInformationSponsee, informationSponsee, handleNextStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;
    setInformationSponsee({ ...informationSponsee, [name]: formattedValue });
  };

  const formatPhoneNumber = (input) => {
    const phoneNumber = input.replace(/\D/g, ''); // Sadece sayıları al
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) {
      return phoneNumber;
    } else if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-tertiaryBlue font-semibold text-start'>Kişisel Bilgiler:</h1>
      <form className='flex flex-col items-center gap-3 w-full sm:px-5 max-w-[500px] mx-auto lg:px-10' onSubmit={handleNextStep}>
        <input
          type='text'
          name='fullName'
          placeholder='Ad - Soyad'
          className='text-xs border w-full border-gray-400 outline-none p-2'
          value={informationSponsee.fullName}
          onChange={handleInputChange}
        />
        <input
          type='tel' 
          name='phoneNumber'
          placeholder='Telefon'
          className='text-xs border w-full border-gray-400 outline-none p-2'
          onChange={handleInputChange}
          value={informationSponsee. phoneNumber} 
        />
        <textarea
          name='message'
          placeholder='Mesajınız...'
          className='h-20 text-xs border w-full border-gray-400 outline-none p-1'
          value={informationSponsee.message}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default InformationForm;
