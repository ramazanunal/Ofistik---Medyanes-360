'use client'
import MessagesList from '@/components/LeftSection/MessagesList'
import Chat from '@/components/RigthSection/Chat'
import { ChakraProvider } from '@chakra-ui/react'
import PhoneBookContext from '@/context/PhoneBookContext'
import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'
import { postAPI, getAPI } from '@/services/fetchAPI'

export default function Home() {
  const [selectedUser, setSelectedUser] = useState()
  const [inbox, setInbox] = useState([])
  const { data: session } = useSession()
  const [selectOption, setSelectOption] = useState('inbox')
  useEffect(() => {
    const getMessages = async () => {
      if (session?.user?.id) {
        const res = await getAPI(
          `/message/${session.user.id}/get-messages?queryType=${selectOption}`
        )

        setInbox(res)
      }
    }
    getMessages()
  }, [session, selectedUser, selectOption])

  const showAvatar = true
  const showCheckBox = true
  const handleUserSelect = async (chatId) => {
    const data = { chatId, receiverId: session.user.id }
    const res = await postAPI('/message/get-message', data)

    setSelectedUser(res)
  }

  const handleIsMutedChange = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, isMuted: !user.isMuted }
      }
      return user
    })
    setUsers(updatedUsers)
    setSelectedUser({ ...selectedUser, isMuted: !selectedUser.isMuted })
  }

  const data = {
    showCheckBox,
    showAvatar,
    selectedUser,
    handleUserSelect,
    handleIsMutedChange,
    selectOption,
    setSelectOption,
  }

  return (
    <PhoneBookContext.Provider value={data}>
      <ChakraProvider>
        <div className="flex bg-inputbg">
          <MessagesList inbox={inbox} />
          <Chat selectedUser={selectedUser} />
        </div>
      </ChakraProvider>
    </PhoneBookContext.Provider>
  )
}
