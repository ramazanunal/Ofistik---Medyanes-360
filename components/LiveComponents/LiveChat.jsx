import React, { memo, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import profile from "@/assets/icons/profile.png";
import Image from "next/image";
import "animate.css";

const LiveChat = memo(
  ({
    showCtrl,
    sendMessage,
    sendFile,
    chats,
    show,
    openFunction,
    chatShow,
  }) => {
    const chatRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    const handleFileSubmit = (e) => {
      e.preventDefault();
      if (selectedFile) {
        sendFile(selectedFile);
        setSelectedFile(null);
      }
    };

    const handleIconClick = () => {
      document.getElementById("file").click();
    };

    const userColors = {};
    const colors = [
      "bg-[#FFDAB9]",
      "bg-[#87CEFA]",
      "bg-[#FFDFBA]",
      "bg-[#F5F5DC]",
      "bg-[#FFD700]",
      "bg-[#FFFACD]",
      "bg-[#BAFFC9]",
      "bg-[#BAE1FF]",
      "bg-[#D1BAFF]",
      "bg-[#FFF0F5]",
      "bg-[#FFFFD1]",
      "bg-[#C4FFD4]",
      "bg-[#E6E6FA]",
      "bg-[#FFC0CB]",
      "bg-[#98FB98]",
    ];
    let colorIndex = 0;

    const getUserColor = (displayName) => {
      if (!userColors[displayName]) {
        userColors[displayName] = colors[colorIndex % colors.length];
        colorIndex++;
      }
      return userColors[displayName];
    };

    return (
      <div className="p-5 bg-gray-100 relative">
        <button
          onClick={openFunction}
          className="bg-premiumOrange w-6 text-xs h-6 rounded-full text-white absolute top-12 left-2 z-40 hover:scale-125 transform duration-500"
        >
          <i
            className={`fa-solid fa-chevron-${chatShow ? "left" : "right"}`}
          ></i>
        </button>
        <div
          className={`mr-[5vw] md:mr-0 h-[88vh] md:h-[96vh] ${
            chatShow ? "hidden " : " animate__animated animate__fadeInRight"
          } flex flex-col fixed right-0 overflow-hidden z-30 bg-white rounded-2xl lg:relative w-[90vw] md:w-[15vw]`}
        >
          <div className="h-[80vh] md:h-[70vh] p-2 w-full overflow-y-auto flex flex-col gap-4 lg:h-[87vh]">
            {chats.map((chat, id) => (
              <div
                key={id}
                className={`w-fit rounded-md p-2 flex flex-row gap-2 ${getUserColor(
                  chat.displayName
                )}`}
              >
                <div className="imageArea">
                  <Image src={profile} width={50} height={50} />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-blue-900 font-semibold">
                    {chat.displayName}
                  </span>
                  <span className="font-medium">{chat.message}</span>
                  {chat.fileUrl && (
                    <a
                      href={chat.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      {chat.fileName}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatRef} />
          </div>
          <form
            className="h-[8vh] p-2 flex items-center bg-white md:h-[10vh] w-[90vw] md:w-[15vw]"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const input = form.message;
              if (input.value.trim()) {
                sendMessage(e);
                input.value = "";
              }
            }}
          >
            {/* <button
              type="button"
              onClick={handleIconClick}
              className="bg-gray-100 p-3 rounded-lg mr-2"
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button> */}
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="text"
              name="message"
              className="h-[44px] w-[7vw] flex-grow bg-gray-100 rounded-lg p-3 focus:outline-none focus:border focus:border-premiumOrange placeholder:text-slate-600"
              placeholder="Mesaj Gönder..."
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-premiumOrange text-white p-2 rounded-lg ml-2"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    );
  }
);

export default LiveChat;
