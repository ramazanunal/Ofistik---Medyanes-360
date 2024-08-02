'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import styles from './styles.module.css'
import Input from './Input'
import { BsFiletypePdf } from 'react-icons/bs'
import { IoMdDownload } from 'react-icons/io'
import { BsFiletypeDocx } from 'react-icons/bs'
import { BsFiletypeDoc } from 'react-icons/bs'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import ImageModal from './ImageModal'
import PhoneBookContext from '@/context/PhoneBookContext'
import { useSession } from 'next-auth/react'
import { formatDate } from '@/lib/utilities/dayGenerator'
import { postAPI } from '@/services/fetchAPI'

function Messages() {
  const { selectedUser } = useContext(PhoneBookContext)
  const { data: session } = useSession()
  const { handleUserSelect } = useContext(PhoneBookContext)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')

  const messagesEndRef = useRef(null)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (selectedUser) {
      const formattedMessages = selectedUser.map((msg) => ({
        text: msg.content,
        sender: msg.senderId === session?.user?.id ? 'me' : 'you',
        avatar:
          'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png', // Adjust accordingly if avatars are different
        hour: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        sendMessage: msg.sender.id === session?.user?.id,
        readMessage: msg.isRead,
        date: formatDate(msg.createdAt),
      }))
      setMessages(formattedMessages)
    }
  }, [selectedUser])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const sendMessage = async () => {
    if (inputValue.trim() !== '') {
      const matchingMessage = selectedUser.find(
        (message) => message.senderId === session.user.id
      )

      let receiverId

      if (matchingMessage) {
        receiverId = matchingMessage.receiverId
      } else {
        if (selectedUser.length > 0) {
          receiverId = selectedUser[0].senderId
        } else {
          console.log('No messages found and no previous contacts available.')
          return
        }
      }

      const data = {
        content: inputValue,
        senderId: session.user.id,
        receiverId: receiverId,
      }

      const res = await postAPI('/message/send-message', data)
      handleUserSelect(res.chatId)
      setInputValue('')
    }
  }

  const sendImage = (image) => {
    if (image) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      const currentDate = formatDate(new Date())
      setMessages([
        ...messages,
        {
          image: image,
          sender: 'me',
          download: true,
          hour: currentTime,
          sent: true,
          date: currentDate,
        },
      ])
    }
  }

  const sendDocument = (document) => {
    if (document) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      const currentDate = formatDate(new Date())
      setMessages([
        ...messages,
        {
          document: document,
          sender: 'me',
          hour: currentTime,
          sent: true,
          date: currentDate,
        },
      ])
    }
  }

  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <div
      className={`${styles.messagesContainer} ${styles.scrollStyles}  md:h-[83vh]  h-[87vh]`}
    >
      {/* Mesajlaşma alanı */}
      <div className={`${styles.messageArea} `}>
        {messages.map((message, index) => (
          <div key={index}>
            {index === 0 ||
            messages[index].date !== messages[index - 1].date ? (
              <div className="text-center flex justify-center items-center   ">
                <p className="bg-[#F66451] text-white p-1 px-4 rounded-md font-semibold text-sm">
                  {message.date}
                </p>
              </div>
            ) : null}
            <div
              className={`${styles.message}  ${
                message.sender === 'me' ? styles.myMessage : styles.notMyMessage
              }`}
            >
              {message.sender !== 'me' && (
                <div className={styles.avatar}>
                  <img
                    src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                    alt="Avatar"
                    className={styles.avatarImage}
                  />
                </div>
              )}

              {message.document ? (
                <div>
                  <a
                    href={message.document.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.documentLink}
                  >
                    <div className="flex ">
                      {message.document.document.name.endsWith('.pdf') ? (
                        <BsFiletypePdf className="mr-3 text-3xl text-pdfBg" />
                      ) : message.document.document.name.endsWith('.docx') ? (
                        <BsFiletypeDocx className="mr-3 text-3xl text-docxBg" />
                      ) : (
                        <BsFiletypeDoc className="mr-3 text-3xl text-docBg" />
                      )}
                      <h2>{message.document.document.name}</h2>
                    </div>

                    <div
                      className={`  flex items-end justify-end space-x-2 text-xs opacity-70`}
                    >
                      <div>{message.hour}</div>
                      {message.sent && (
                        <IoCheckmarkDoneSharp className="text-premiumOrange" />
                      )}
                    </div>
                  </a>
                  {message.document.message !== '' && (
                    <div
                      className={`${
                        message.sender === 'me'
                          ? styles.myMessageText
                          : styles.messageText
                      } flex flex-col mt-2`}
                    >
                      <span className="max-w-screen-sm overflow-hidden break-words">
                        {message.document.message}
                      </span>
                      <div className=" flex  justify-end items-center space-x-2 text-xs mt-1 opacity-70">
                        <div>{message.hour}</div>
                        {message.sent && (
                          <IoCheckmarkDoneSharp className="text-premiumOrange" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : message.image ? (
                <div className="flex flex-col justify-end">
                  {message.image.image.files.map((img, index) => (
                    <div key={index} className="mx-1">
                      <div className={styles.imageWithDownload}>
                        <div className={styles.imgDiv}>
                          <img
                            src={img}
                            alt="Sent"
                            className={styles.sentImage}
                            onClick={() => {
                              handleImageClick(img)
                            }}
                          />
                          {message.download && (
                            <a
                              href={message.image.image}
                              download="image"
                              className={styles.downloadLink}
                            >
                              <IoMdDownload />
                            </a>
                          )}
                          <div
                            className={`absolute bottom-1 right-2 flex items-center space-x-2 text-xs `}
                          >
                            <div className="text-plusTxt">{message.hour}</div>
                            {message.sent && (
                              <IoCheckmarkDoneSharp className="text-premiumOrange" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {message.image.message !== '' && (
                    <div
                      className={`${
                        message.sender === 'me'
                          ? styles.myMessageText
                          : styles.messageText
                      } flex flex-col mt-2`}
                    >
                      <span className="max-w-screen-sm overflow-hidden break-words">
                        {message.image.message}
                      </span>
                      <div className=" flex  justify-end items-center space-x-2 text-xs mt-1 opacity-70">
                        <div>{message.hour}</div>
                        {message.sent && (
                          <IoCheckmarkDoneSharp className="text-premiumOrange" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div
                    className={`${
                      message.sender === 'me'
                        ? styles.myMessageText
                        : styles.messageText
                    }`}
                  >
                    <span className="max-w-screen-sm overflow-hidden break-words">
                      {message.text}
                    </span>
                    <div className=" flex  justify-end items-center space-x-2 text-xs mt-1 opacity-70">
                      <div>{message.hour}</div>
                      {message.sent && (
                        <IoCheckmarkDoneSharp className="text-premiumOrange" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Mesaj giriş alanı */}
      <Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        sendMessage={sendMessage}
        sendImage={sendImage}
        sendDocument={sendDocument}
      />

      {/* Resim Modal */}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default Messages
