import React, { memo, useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import "./style.css";
import WhiteBoardMain from "./whiteBoardMain";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MainScreen = memo(
  ({
    joined,
    setJoined,
    joinRoom,
    localTracks,
    channel,
    handleMuteMic,
    setShowParticipants,
    showParticipants,
    handleMuteCamera,
    handleScreenShare,
    users,
    UID,
    rtmClient,
    screenShareRef,
    roomToken,
    uuid,
    setChatShow,
    chatShow,
    leaveRoom,
    shareScreenOpen,
  }) => {
    const [whiteboardOpen, setWhiteboardOpen] = useState(false);
    const [role, setRole] = useState(false);
    const [userNames, setUserNames] = useState(false);

    useEffect(() => {
      const fetchUserNames = async () => {
        const names = {};
        for (const user of users) {
          const usernamePromise = rtmClient.getUserAttributesByKeys(user.uid, [
            "name",
          ]);
          const { name } = await usernamePromise;
          names[user.uid] = name;
        }
        setUserNames(names);
        // debugger;
      };

      fetchUserNames();

      const parts = window.location.href.split("/");
      const role = parts[parts.length - 1];
      const [roleData] = role.split("/").map((part) => part.split("=")[1]);
      setRole(roleData);
      if (role === "reader") {
        joinRoom();
      } else {
        setJoined("load");
        joinRoom();
      }

      checkCameraPermission();
    }, []);

    const openWhiteboard = () => {
      const shareScreen = document.getElementById("share-screen");
      // if (shareScreen.querySelector(".userCam")) {
      //   toast.error("Beyaz tahtayı açmak için lütfen büyük kamerayı kapatın!");
      //   return;
      // }
      setWhiteboardOpen(true);
      toast.success("Beyaz Tahta Başarılı bir şekilde Açıldı");
    };

    const closeWhiteboard = () => {
      setWhiteboardOpen(false);
    };

    const stringUid = UID.toString();

    const getContainerWidthClass = (chatShow, showParticipants) => {
      if (!chatShow && showParticipants) {
        return "w-[60%]";
      } else if (!chatShow && !showParticipants) {
        return "w-[70%]";
      } else if (showParticipants && chatShow) {
        return "w-[70%]";
      } else if (!showParticipants && chatShow) {
        return "w-[85%]";
      }
    };

    const copyMeetingLink = () => {
      const currentUrl = window.location.href;
      const readerUrl = currentUrl.replace("role=admin", "role=reader");
      navigator.clipboard
        .writeText(readerUrl)
        .then(() => {
          toast.success("Toplantı linki başarıyla kopyalandı!");
        })
        .catch((err) => {
          console.error("Kopyalama sırasında hata oluştu:", err);
        });
    };

    const handleCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        handleMuteCamera();
      } catch (err) {
        console.error("Kamera izni alınamadı:", err);
      }
    };
    const [muted, setMuted] = useState(true);

    const [timeElapsed, setTimeElapsed] = useState(0);
    const intervalRef = useRef(null);
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }, []);
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${
        secs < 10 ? "0" : ""
      }${secs}`;
    };
    const [size, setSize] = useState("");
    useEffect(() => {
      // showChat ve showParticipants durumlarına göre genişliği ayarlayın
      if (!chatShow && showParticipants) {
        setSize("50vw");
      } else if (!chatShow && !showParticipants) {
        setSize("65vw");
      } else if (showParticipants && chatShow) {
        setSize("70vw");
      } else if (!showParticipants && chatShow) {
        setSize("80vw");
      }
    }, [chatShow, showParticipants]);
    const [showWhiteboardLarge, setShowWhiteboardLarge] = useState(true);
    const [showCamera, setShowCamera] = useState(true);
    const [showMic, setShowMic] = useState(true);

    const swapViews = () => {
      setShowWhiteboardLarge((prev) => !prev);
    };
    const [cameraPermission, setCameraPermission] = useState(null);
    const checkCameraPermission = async () => {
      const permissionStatus = await navigator.permissions.query({
        name: "camera",
      });
      if (permissionStatus.state === "granted") {
        setCameraPermission(true);
      } else {
        setCameraPermission(false);
      }
    };

    return (
      <>
        <div
          id="video-holder"
          className={`relative h-screen overflow-y-auto w-full flex flex-wrap justify-center p-2 gap-4 lg:p-4 ${
            chatShow ? "lg:w-[85vw]" : "lg:w-[83vw]"
          } bg-gray-100`}
        >
          {/* Share Screen */}
          {roomToken &&
            UID &&
            uuid &&
            whiteboardOpen &&
            shareScreenOpen &&
            role === "admin" && (
              <>
                <div
                  className={`whiteBoard ${
                    showWhiteboardLarge
                      ? "w-[100%] h-[90%]"
                      : "!w-[400px] !h-[250px] absolute z-20 top-8 right-16"
                  }`}
                >
                  <WhiteBoardMain
                    showWhiteboardLarge={showWhiteboardLarge}
                    showParticipants={showParticipants}
                    showChat={chatShow}
                    roomToken={roomToken}
                    uid={stringUid}
                    uuid={uuid}
                  />
                </div>
                <div
                  ref={screenShareRef}
                  id="share-screen"
                  className={`${
                    showWhiteboardLarge
                      ? "!w-[400px] !h-[250px] absolute z-20 top-8 right-16"
                      : "w-[100%] h-[90%]"
                  }  bg-gray-100`}
                ></div>
                <button
                  onClick={swapViews}
                  className={`bg-premiumOrange w-8 h-8 rounded-full text-white absolute top-8 right-12 z-30 ${
                    whiteboardOpen && shareScreenOpen ? "block" : "hidden"
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </>
            )}
          {roomToken && UID && uuid && whiteboardOpen && role === "reader" && (
            <>
              <div
                className={`whiteBoard ${
                  showWhiteboardLarge
                    ? "w-[100%] h-[90%]"
                    : "!w-[400px] !h-[250px] absolute z-20 top-8 right-16"
                }`}
              >
                <WhiteBoardMain
                  showWhiteboardLarge={showWhiteboardLarge}
                  showParticipants={showParticipants}
                  showChat={chatShow}
                  roomToken={roomToken}
                  uid={stringUid}
                  uuid={uuid}
                />
              </div>
              <div
                ref={screenShareRef}
                id="share-screen"
                className={`${
                  showWhiteboardLarge
                    ? "!w-[400px] !h-[250px] absolute z-20 top-8 right-16"
                    : "w-[100%] h-[90%]"
                }  bg-gray-100`}
              ></div>
              <button
                onClick={swapViews}
                className={`bg-premiumOrange w-8 h-8 rounded-full text-white absolute top-8 right-12 z-30 ${
                  whiteboardOpen ? "block" : "hidden"
                }`}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </>
          )}

          {roomToken &&
            UID &&
            uuid &&
            whiteboardOpen &&
            !shareScreenOpen &&
            role === "admin" && (
              <>
                <div className={`whiteBoard w-[100%] h-[85%]`}>
                  <WhiteBoardMain
                    showWhiteboardLarge={showWhiteboardLarge}
                    showParticipants={showParticipants}
                    showChat={chatShow}
                    roomToken={roomToken}
                    uid={stringUid}
                    uuid={uuid}
                  />
                </div>
              </>
            )}
          {roomToken &&
            UID &&
            uuid &&
            shareScreenOpen &&
            !whiteboardOpen &&
            role === "admin" && (
              <>
                <div
                  ref={screenShareRef}
                  id="share-screen"
                  className={`
                    w-[100%] h-[85%]
                  bg-gray-100`}
                ></div>
              </>
            )}
          {roomToken && UID && uuid && role === "reader" && !whiteboardOpen && (
            <>
              <div
                ref={screenShareRef}
                id="share-screen"
                className={`
                    w-[100%] h-[85%]
                  bg-gray-100`}
              ></div>
            </>
          )}
          {/* Join Stream */}
          <div className="w-full fixed bg-slate-200/10 py-2 z-10 bottom-0 flex justify-center ">
            <div
              className={`flex justify-between items-center p-2 ${getContainerWidthClass(
                chatShow,
                showParticipants
              )}`}
            >
              <div className="channelNameArea flex flex-row items-center justify-center">
                <div className="timerArea flex flex-row items-center justify-center mr-3">
                  <div className="w-5 h-5 bg-red-600 rounded-full mr-2 blinking"></div>
                  <div className="flex flex-col items-center justify-center">
                    <b className="text-lg cursor-pointer text-gray-600">
                      {formatTime(timeElapsed)}
                    </b>
                  </div>
                </div>
                <h1 className="text-xl tracking-wider text-gray-700">
                  {decodeURIComponent(channel)} Toplantısı
                </h1>
              </div>
              <div className="flex items-center justify-center gap-4">
                {/* Whiteboard açma/kapatma butonu */}
                <div id="whiteBoard">
                  <button
                    title="Beyaz Tahtayı Aç"
                    onClick={() => {
                      if (whiteboardOpen) {
                        toast.success(
                          "Beyaz Tahta Başarılı bir şekilde kapatıldı"
                        );
                        closeWhiteboard();
                      } else {
                        openWhiteboard();
                      }
                    }}
                    className={`px-2 py-5 whiteBoardButton w-full flex items-center justify-center  rounded-2xl cursor-pointer bg-gray-200 text-premiumOrange hover:bg-premiumOrange hover:text-white transition-all duration-500 ${
                      whiteboardOpen ? "bg-premiumOrange text-white" : ""
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7"
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
                  <h1 className="text-sm text-center text-gray-700 mt-2">
                    {whiteboardOpen
                      ? "Beyaz Tahtayı Kapat"
                      : "Beyaz Tahtayı Aç"}
                  </h1>
                </div>
                {/* Kamera Butonu */}
                {cameraPermission === true && (
                  <div className="flex flex-col items-center justify-center">
                    <div
                      id="camera"
                      title="Kamerayı Aç"
                      className={`px-2 py-5 w-full flex items-center justify-center  rounded-2xl cursor-pointer bg-gray-200 text-premiumOrange hover:bg-premiumOrange hover:text-white transition-all duration-500`}
                      onClick={async () => {
                        const user = users.find((user) => user.uid === UID);
                        if (user) {
                          if (!user.videoTrack) {
                            await handleCameraPermission();
                          } else {
                            handleMuteCamera(user);
                          }
                        }
                        if (user.videoTrack.muted === false) {
                          toast.success(
                            "Kamera başarılı bir şekilde kapatıldı"
                          );
                          setShowCamera(false);
                        } else if (user.videoTrack.muted === true) {
                          toast.success("Kamera başarılı bir şekilde açıldı");
                          setShowCamera(true);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
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
                    <h1 className="text-sm text-center text-gray-700 mt-2">
                      {showCamera ? "Kamera Kapat" : "Kamera Aç"}
                    </h1>
                  </div>
                )}
                {/* Çıkış Butonu */}

                {/* Mikrofon Butonu */}
                <div className="flex flex-col items-center justify-center">
                  <div
                    id="mic"
                    title="Mikrofonu Aç"
                    className="px-2 py-5 w-full flex items-center justify-center  rounded-2xl cursor-pointer bg-gray-200 text-premiumOrange hover:bg-premiumOrange hover:text-white transition-all duration-500"
                    onClick={async () => {
                      const user = users.find((user) => user.uid === UID);
                      if (user) {
                        handleMuteMic(user);
                      }
                      if (user.audioTrack.muted === false) {
                        toast.success(
                          "Mikrofon başarılı bir şekilde kapatıldı"
                        );
                        setShowMic(false);
                        setMuted(false);
                      } else if (user.audioTrack.muted === true) {
                        setMuted(true);
                        setShowMic(true);
                        toast.success("Mikrofon başarılı bir şekilde açıldı");
                      }
                    }}
                  >
                    {muted ? (
                      <i class="fa-solid fa-microphone-lines text-[22px] w-7 h-7 text-center flex items-center justify-center"></i>
                    ) : (
                      <i class="fa-solid fa-microphone-lines-slash flex items-center justify-center text-xl w-7 h-7 text-center"></i>
                    )}
                  </div>
                  <h1 className="text-sm text-center text-gray-700 mt-2">
                    {showMic ? "Mikrofon Kapat" : "Mikrofon Aç"}
                  </h1>
                </div>
                {/* Ekran Paylaş Butonu */}
                {role === "admin" && (
                  <div className="flex flex-col items-center justify-center">
                    <div
                      id="screen-share"
                      title="Ekranı Paylaş"
                      className={`px-2 py-5 w-full flex items-center justify-center  rounded-2xl cursor-pointer bg-gray-200 text-premiumOrange hover:bg-premiumOrange hover:text-white transition-all duration-500`}
                      onClick={handleScreenShare}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                        />
                      </svg>
                    </div>
                    <h1 className="text-sm text-center text-gray-700 mt-2">
                      {shareScreenOpen
                        ? "Ekran Paylaşımı Kapat"
                        : "Ekran Paylaşımı Aç"}
                    </h1>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center gap-4">
                {role === "admin" && (
                  <div
                    id="copyMeet"
                    title="Toplantı Linkini Kopyala"
                    className="p-2 rounded-xl cursor-pointer text-2xl text-premiumOrange transition-all duration-500"
                    onClick={copyMeetingLink}
                  >
                    <i class="fa-solid fa-copy"></i>
                  </div>
                )}
                {/* Çıkış yapma Butonu */}
                <div className="flex flex-row items-center justify-center">
                  <div
                    id="exit"
                    title="Toplantıdan Ayrıl"
                    className={`px-8 py-5 w-full flex flex-row items-center justify-center  rounded-2xl cursor-pointer bg-red-600 text-gray-50  transition-all duration-500`}
                    onClick={leaveRoom}
                  >
                    <i class="fa-solid fa-phone-slash text-[22px] w-7 h-7 text-center flex items-center justify-center"></i>
                    <h1 className="text-base text-center text-gray-50 ml-2 font-semibold mb-2">
                      Ayrıl
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="userVideo"
          className=" flex flex-row flex-wrap bg-gray-100 lg:w-[15vw] max-h-screen overflow-y-auto"
        >
          {users.map((user) => (
            <VideoPlayer
              showWhiteboard={whiteboardOpen}
              role={role}
              showWhiteboardLarge={showWhiteboardLarge}
              rtmClient={rtmClient}
              key={user.uid}
              user={user}
              UID={UID}
              usersNumber={users.length}
            />
          ))}
        </div>
      </>
    );
  }
);

export default MainScreen;
