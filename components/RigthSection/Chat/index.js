import React from 'react'
import ChatHeader from '../ChatHeader'
import Messages from '../Messages'

function Chat({selectedUser}) {

 
  return (
    <div className={`md:w-[75%] w-full  ${selectedUser ? "" : "md:block hidden"} bg-messageBodyBg`}>
    <ChatHeader />
    <Messages/>
    </div>
  )
}

export default Chat