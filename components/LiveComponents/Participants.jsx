import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import profile from "@/assets/icons/profile.png"; // Ensure this is used or remove
import VideoPlayer from "./VideoPlayer";

const Participants = memo(
  ({
    showCtrl,
    setShowCtrl,
    rtmClient,
    totalMembers,
    participants,
    show,
    users,
    openParticipants,
    UID,
    whiteboardOpen,
    showWhiteboardLarge,
    closeWhiteboard,
    hasSmallViewScreen1,
  }) => {
    const [participantNames, setParticipantNames] = useState({});
    const [role, setRole] = useState(false);

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
        className="relative bg-gray-100 rounded-2xl md:w-[13vw] md:h-[20vh] w-[80vw] h-[25vh] flex flex-col items-center justify-between mb-5 userBoxForCam shadow-lg"
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

    // Benzersiz kullanıcıları toplamak için Set kullanın
    const uniqueParticipants = new Set(users.map((user) => String(user.uid)));
    participants.forEach((participantId) =>
      uniqueParticipants.add(String(participantId))
    );
    debugger;
    return (
      <div className="p-5 pt-2 bg-gray-100 relative">
        <button
          onClick={openParticipants}
          className="bg-premiumOrange w-6 text-xs h-6 rounded-full text-white absolute top-12 right-2 z-40 hover:scale-125 transform duration-500"
        >
          <i className={`fa-solid fa-chevron-${show ? "left" : "right"}`}></i>
        </button>
        <div
          className={`ml-[5vw] md:ml-0 h-[88vh] md:h-[96vh] fixed left-0 ${
            show
              ? "animate__animated animate__fadeInLeft"
              : "hidden animate__animated animate__fadeOutLeft"
          } z-30 bg-white lg:relative rounded-2xl w-[90vw] md:w-[15vw]`}
        >
          <div className="relative m-3 p-5 font-bold flex items-center justify-center gap-4 border-b-2 border-gray-300">
            <span className="text-xl text-gray-600">Katılımcılar</span>
            <div className=" text-premiumOrange text-lg flex justify-center items-center rounded-full">
              {totalMembers}
            </div>
          </div>
          <div
            id="userVideo"
            className="flex flex-col items-center max-h-[75vh] justify-center overflow-scroll"
          >
            {[...uniqueParticipants].map((uid) => {
              const user = users.find((user) => String(user.uid) === uid);
              return renderUserBox(user || { uid }, Boolean(user));
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default Participants;
