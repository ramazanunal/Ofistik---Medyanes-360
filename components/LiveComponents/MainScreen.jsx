import React, { memo, useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import "./style.css";
import WhiteBoardMain from "./whiteBoardMain";

const MainScreen = memo(
  ({
    joined,
    setJoined,
    joinRoom,
    localTracks,
    handleMuteMic,
    setShowParticipants,
    showParticipants,
    handleMuteCamera,
    handleScreenShare,
    users,
    UID,
    screenShareRef,
    roomToken,
    uuid,
    setChatShow,
    chatShow,
  }) => {
    console.log(chatShow);
    const [whiteboardOpen, setWhiteboardOpen] = useState(false);
    const [role, setRole] = useState(false);

    useEffect(() => {
      const parts = window.location.href.split("/");
      const role = parts[parts.length - 1];
      const [roleData] = role.split("/").map((part) => part.split("=")[1]);
      setRole(roleData);
      if (role === "reader") {
        joinRoom();
      }
    }, []);

    const openWhiteboard = () => {
      setWhiteboardOpen(true);
    };

    const closeWhiteboard = () => {
      setWhiteboardOpen(false);
    };
    const openChat = () => {
      setChatShow(!chatShow);
      console.log("Chat Durumu:", chatShow); // Bu, güncellenmiş değeri gösterecektir
    };
    const openParticipants = () => {
      setShowParticipants((prevShowParticipants) => !prevShowParticipants);
    };

    const stringUid = UID.toString();

    return (
      <>
        <div
          id="video-holder"
          className={`relative h-[90vh] overflow-y-auto w-full flex flex-wrap justify-center p-2 gap-4 lg:p-4 ${
            chatShow ? "lg:w-[65vw]" : "lg:w-[83vw]"
          } bg-gray-200`}
        >
          {/* Share Screen */}
          {roomToken && UID && uuid && whiteboardOpen && (
            <div
              className={`whiteBoard ${
                chatShow ? "lg:w-[60vw]" : "lg:w-[80vw]"
              }`}
            >
              <WhiteBoardMain
                showParticipants={showParticipants}
                showChat={chatShow}
                roomToken={roomToken}
                uid={stringUid}
                uuid={uuid}
              />
            </div>
          )}
          <div
            ref={screenShareRef}
            id="share-screen"
            className={`hidden top-0 left-0 !w-[100%] h-[60vh] bg-gray-200`}
          ></div>
          {/* Join Stream */}
          <div className="w-full fixed bg-slate-300/10 py-2 z-10 bottom-0 flex justify-center">
            {joined === true ? (
              <div className="flex items-center justify-center gap-4">
                {/* Whiteboard açma/kapatma butonu */}
                <div id="whiteBoard">
                  <button
                    title="Beyaz Tahtayı Aç"
                    onClick={() => {
                      if (whiteboardOpen) {
                        closeWhiteboard();
                      } else {
                        openWhiteboard();
                      }
                    }}
                    className={`p-2 whiteBoardButton rounded-md cursor-pointer bg-premiumOrange text-white hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500 ${
                      whiteboardOpen ? "bg-premiumOrange" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect
                        x="8"
                        y="2"
                        width="8"
                        height="4"
                        rx="1"
                        ry="1"
                      ></rect>
                    </svg>
                  </button>
                </div>
                {/* Kamera Butonu */}
                <div
                  id="camera"
                  title="Kamerayı Aç"
                  className={`p-2 rounded-md cursor-pointer bg-premiumOrange text-white hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500`}
                  onClick={async () => {
                    const user = users.find((user) => user.uid === UID);
                    if (user) {
                      handleMuteCamera(user);
                    }
                    const camera = document.getElementById("camera");
                    if (user.videoTrack.muted === false) {
                      camera.classList.remove(
                        "bg-premiumOrange",
                        "text-white",
                        "hover:bg-gray-200",
                        "hover:text-premiumOrange"
                      );
                      camera.classList.add(
                        "bg-gray-200",
                        "text-premiumOrange",
                        "hover:bg-premiumOrange",
                        "hover:text-gray-200"
                      );
                    } else if (user.videoTrack.muted === true) {
                      camera.classList.remove(
                        "bg-gray-200",
                        "text-premiumOrange",
                        "hover:bg-premiumOrange",
                        "hover:text-gray-200"
                      );
                      camera.classList.add(
                        "bg-premiumOrange",
                        "text-white",
                        "hover:bg-gray-200",
                        "hover:text-premiumOrange"
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                </div>
                {/* Mikrofon Butonu */}
                <div
                  id="mic"
                  title="Mikrofonu Aç"
                  className="p-2 rounded-xl cursor-pointer bg-premiumOrange text-gray-100 hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500"
                  onClick={async () => {
                    const user = users.find((user) => user.uid === UID);
                    if (user) {
                      handleMuteMic(user);
                    }
                    const camera = document.getElementById("mic");
                    if (user.audioTrack.muted === false) {
                      camera.classList.remove(
                        "bg-premiumOrange",
                        "text-white",
                        "hover:bg-gray-200",
                        "hover:text-premiumOrange"
                      );
                      camera.classList.add(
                        "bg-gray-200",
                        "text-premiumOrange",
                        "hover:bg-premiumOrange",
                        "hover:text-gray-200"
                      );
                    } else if (user.audioTrack.muted === true) {
                      camera.classList.remove(
                        "bg-gray-200",
                        "text-premiumOrange",
                        "hover:bg-premiumOrange",
                        "hover:text-gray-200"
                      );
                      camera.classList.add(
                        "bg-premiumOrange",
                        "text-white",
                        "hover:bg-gray-200",
                        "hover:text-premiumOrange"
                      );
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                {/* Ekran Paylaş Butonu */}
                {role === "admin" && (
                  <div
                    id="screen-share"
                    title="Ekranı Paylaş"
                    className={`rounded-xl cursor-pointer bg-premiumOrange text-gray-100 hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500 p-2`}
                    onClick={handleScreenShare}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                      />
                    </svg>
                  </div>
                )}
                {/* Chat Butonu */}
                <div
                  id="chat"
                  title="Chati Aç"
                  className="p-2 rounded-xl cursor-pointer bg-premiumOrange text-gray-100 hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500"
                  onClick={openChat}
                >
                  <i class="fa-regular fa-comments"></i>
                </div>
                {/* Katılımcılar Butonu */}
                <div
                  id="participants"
                  title="Katılımcıları Aç"
                  className="p-2 rounded-xl cursor-pointer bg-premiumOrange text-gray-100 hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500"
                  onClick={openParticipants}
                >
                  <i class="fa-solid fa-users"></i>
                </div>
              </div>
            ) : (
              <button
                className=" rounded-md bg-orange-500 px-3 py-3 font-bold"
                onClick={() => {
                  setJoined("load");
                  joinRoom();
                }}
              >
                {joined === "load" ? "Requesting..." : "Toplantıyı Başlat"}
              </button>
            )}
          </div>
        </div>
        <div className="userVideo flex flex-col overflow-y-scroll items-center justify-center bg-gray-200 lg:w-[18vw]">
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} UID={UID} />
          ))}
        </div>
      </>
    );
  }
);

export default MainScreen;
