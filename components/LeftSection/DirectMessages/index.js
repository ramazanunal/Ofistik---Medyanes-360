import React from "react";
import { useContext } from "react";
import PhoneBookContext from "@/context/PhoneBookContext";
import { PiSpeakerSimpleXLight } from "react-icons/pi";
import { MdCheck } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

function DirectMessages({ filteredUser, filterType  }) {
  const { handleUserSelect } = useContext(PhoneBookContext);

  const filterMessages = (person) => {
    if (filterType === 'unread') {
      // Sadece okunmamış mesajları olan kişileri filtrele
      return person.unreadMessages > 0;
    }
    // Varsayılan olarak tüm kişileri göster
    return true;
  };

  return (
    <div className="mt-[250px] md:mt-[390px]" >
      <div className="flex justify-between items-center  pr-7  ">
        
          
          <div className="text-favTxt text-xs font-semibold ml-10">
            Sohbet Listesi
          </div>
        
      </div>
      <div className=" mt-5">
        {filteredUser.filter(filterMessages).map((person) => (
          <>
          
            <div
            key={person.id}
            className="flex justify-between items-center hover:bg-inputbg pr-8 pl-10 py-3  cursor-pointer"
            onClick={() => handleUserSelect(person)}
          >
            <div className="flex">
              <div className="relative">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="absolute bg-dotBg w-3 h-3 rounded-full right-0 bottom-2 border border-[2px] border-inputbg"></div>
              </div>
              <div className="ml-3">
                <h2 className="text-ms font-semibold text-favTxt ">
                  {person.name}
                </h2>
                {person.messages.length > 0 && (
                  <div className="flex flex-col text-personMesTxt font-[400]  ">
                    <span className="text-md">
                      {person.messages[person.messages.length - 1].message}
                    </span>
                  </div>
                )}
                
              </div>
            </div>
            
            <div className="flex flex-col  items-end">
             <div className="text-muted flex items-center space-x-2">
           
              {person.isMuted && (
                <div className="text-muted">
                  <span>
                    <PiSpeakerSimpleXLight />
                  </span>
                </div>
              )}
              <div>{person.messages[person.messages.length - 1].hour}</div>
              <div>
              {person.sendMessage && (
                <IoCheckmarkDoneSharp className="text-checktxt" />
              )}
              {person.unsendMessage && <MdCheck />}
              {person.readMessage && <IoCheckmarkDoneSharp className="text-premiumOrange" />}
            </div>
            </div>
            <div>
             {person.unreadMessages > 0  && (
              <div className="w-5 h-5 bg-premiumOrange text-xs text-plusTxt font-bold flex items-center rounded-full p-3  justify-center">
                <span>{person.unreadMessages}</span>
              </div>
            )}
            </div>
            </div>
           
          </div>
          <div className="border-b w-[75%] ml-10"/> 
         
          
          </>
         
        ))}
      </div>
    </div>
  );
}

export default DirectMessages;
