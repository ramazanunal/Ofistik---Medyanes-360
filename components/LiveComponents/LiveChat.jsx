import React, { memo, useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import profile from "@/assets/icons/profile.png";
import Image from "next/image";
import "animate.css";
import VideoPlayer from "./VideoPlayer";

const LiveChat = memo(
  ({
    showCtrl,
    sendMessage,
    sendFile,
    chats,
    show,
    openFunction,
    chatShow,
    rtmClient,
    totalMembers,
    participants,
    users,
    UID,
    whiteboardOpen,
    showWhiteboardLarge,
    closeWhiteboard,
    hasSmallViewScreen1,
  }) => {
    const chatRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [participantNames, setParticipantNames] = useState({});
    const [role, setRole] = useState(false);

    useEffect(() => {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chats]);

    useEffect(() => {
      const parts = window.location.href.split("/");
      const role = parts[parts.length - 1];
      const [roleData] = role.split("/").map((part) => part.split("=")[1]);
      setRole(roleData);
    }, []);

    const fetchName = async (participantId) => {
      try {
        const username = await rtmClient.getUserAttributesByKeys(
          participantId,
          ["name"]
        );
        const { name } = username;
        setParticipantNames((prevNames) => ({
          ...prevNames,
          [participantId]: name,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      participants.forEach(fetchName);
    }, [participants, rtmClient]);

    const renderUserBox = (user, isUser) => (
      <div
        key={user.uid}
        className="relative bg-gray-100 rounded-2xl md:w-[9vw] md:h-[18vh] w-[80vw] h-[25vh] flex flex-col items-center justify-between m-3 userBoxForCam shadow-lg"
        id={`userBoxForCam-${user.uid}`}
      >
        {isUser && (
          <VideoPlayer
            hasSmallViewScreen1={hasSmallViewScreen1}
            closeWhiteboard={closeWhiteboard}
            showWhiteboard={whiteboardOpen}
            role={role}
            showWhiteboardLarge={showWhiteboardLarge}
            rtmClient={rtmClient}
            key={user.uid}
            user={user}
            UID={UID}
            usersNumber={users.length}
          />
        )}
        <span
          id={`user-${user.uid}`}
          className="truncate text-gray-700 font-semibold text-center p-2"
        >
          {participantNames[user.uid] || user.uid}
        </span>
      </div>
    );

    const uniqueParticipants = new Set(users.map((user) => String(user.uid)));
    participants.forEach((participantId) =>
      uniqueParticipants.add(String(participantId))
    );

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

    const isMobile = window.innerWidth < 768;
    return (
      <div
        className={`p-5  bg-gray-100  ${
          isMobile ? "h-[90vh] absolute z-30" : "relative"
        }`}
      >
        <button
          onClick={openFunction}
          className="bg-premiumOrange w-6 text-xs h-6 rounded-full text-white absolute top-12 left-2 z-40 hover:scale-125 transform duration-500"
        >
          <i
            className={`fa-solid fa-chevron-${chatShow ? "left" : "right"}`}
          ></i>
        </button>
        {/* Participants Section */}
        <div
          className={` ${
            chatShow ? "hidden " : " animate__animated animate__fadeInRight"
          } `}
        >
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg md:h-[50vh] h-[40vh] overflow-y-auto mb-4 md:w-[23vw]">
            <div className="relative m-3 p-5 font-bold flex items-center justify-center gap-4 border-b border-gray-300 w-full">
              <span className="text-xl text-gray-600">Katılımcılar</span>
              <div className="text-premiumOrange text-lg flex justify-center items-center rounded-full">
                {totalMembers}
              </div>
            </div>
            <div
              id="userVideo"
              className="flex flex-row flex-wrap items-center max-h-[55vh] justify-center overflow-scroll w-full"
            >
              {[...uniqueParticipants].map((uid) => {
                const user = users.find((user) => String(user.uid) === uid);
                return renderUserBox(user || { uid }, Boolean(user));
              })}
            </div>
          </div>

          {/* Chat Section */}
          <div className="flex flex-col h-[45vh] md:h-[45vh] bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-[40vh] p-2 overflow-y-auto flex flex-col gap-4">
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
                  </div>
                </div>
              ))}
              <div ref={chatRef} />
            </div>
            <form
              className="h-[8vh] p-2 flex items-center bg-gray-100 w-full"
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
              <input
                type="text"
                name="message"
                className="h-[44px] flex-grow bg-white rounded-lg p-3 focus:outline-none focus:border focus:border-premiumOrange placeholder:text-slate-600"
                placeholder="Mesaj Gönder..."
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
      </div>
    );
  }
);

export default LiveChat;
