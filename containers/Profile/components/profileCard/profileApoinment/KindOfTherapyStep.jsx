"use client"
import { useState } from 'react';
import { RiPsychotherapyLine } from 'react-icons/ri';

const KindOfTherapyStep = ({setKindOfTherapy}) => {
  const typesOfRelationships = ["İlişki Terapisi", "Depresyon, ", "Uyku Bozuklukları", "Kaygı(Anksiyete)", "Travma Sonrası Stress Bozukluğu", "Bireysel Terapi"];

  const [selectedType, setSelectedType] = useState(null);

  const handleSelectTypesOfRelationships = (index) => {
    setSelectedType(index);    
    setKindOfTherapy(typesOfRelationships[index]);
  };

  return (
    <div>
      <h1 className='text-tertiaryBlue font-semibold text-start pb-5' >Terapi Türünü Seçiniz:</h1>
      <div className='grid grid-cols-1 px- sm:grid-cols-2 gap-5 '>
        {typesOfRelationships &&
          typesOfRelationships.map((item, i) => (
            <div
              key={i}
              className={`break-words text-xs flex items-center gap-2 p-3 rounded-lg hover:opacity-90 duration-300 cursor-pointer ${selectedType === i ? 'bg-primaryGreen text-white' : 'bg-tertiaryBlue text-white'
                }`}
              onClick={() => handleSelectTypesOfRelationships(i)}
            >
              <div className='text-white text-start'>
                <RiPsychotherapyLine size={20} />
              </div>
              <h1 className='text-start'>{item}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KindOfTherapyStep;
