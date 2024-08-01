import React from 'react'
import ChatHeader from '../ChatHeader'
import Messages from '../Messages'

function Chat({ selectedUser }) {
  return selectedUser ? (
    <div
      className={`md:w-[75%] w-full  ${
        selectedUser ? '' : 'md:block hidden'
      } bg-messageBodyBg`}
    >
      <ChatHeader />
      <Messages />
    </div>
  ) : (
    <div>test</div>
  )
}

export default Chat
