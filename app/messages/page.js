
"use client"
import MessagesList from "@/components/LeftSection/MessagesList";
import Chat from "@/components/RigthSection/Chat";
import { ChakraProvider } from "@chakra-ui/react";
import PhoneBookContext from "../context/PhoneBookContext"
import { useState,useEffect } from "react";
import userData from "@/public/assets/data/users.json"


export default function Home() {
  const [selectedUser, setSelectedUser] = useState(userData[0]);
  const [users, setUsers] = useState(userData);

 
  const showAvatar = true;
  const showCheckBox = true;
    const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleIsMutedChange = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, isMuted: !user.isMuted };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUser({ ...selectedUser, isMuted: !selectedUser.isMuted });
  };

  const data = {
    showCheckBox,
    showAvatar,
    selectedUser,
    handleUserSelect,
    handleIsMutedChange,
    users
    

  }

 

  return (
    <PhoneBookContext.Provider value={data}>
    
      <ChakraProvider>
      <div className="flex bg-inputbg">
        <MessagesList selectedUser={selectedUser} />
        <Chat selectedUser={selectedUser} />
    
    </div>
    </ChakraProvider>
  
    </PhoneBookContext.Provider>
  
  )
}
