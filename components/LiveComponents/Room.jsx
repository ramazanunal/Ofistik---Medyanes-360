"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraRTM from "agora-rtm-sdk";
import MainScreen from "./MainScreen";
import Participants from "./Participants";
import LiveChat from "./LiveChat";
const APP_ID = "b524a5780b4c4657bf7c8501881792be";
import AC from "agora-chat";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const conn = new AC.connection({
  appKey: "611139134#1334578",
});
function Room() {
  const router = useRouter();

  const base = useParams();
  const fullChName = base.ChName; // channelName%3Demrahoda
  const chNameParts = fullChName.split("%3D");
  const chName = chNameParts[1]; // emrahoda
  const channel = chName;

  const screenShareRef = useRef();
  const [token, setToken] = useState(null);
  const [joined, setJoined] = useState(false);
  const [chatShow, setChatShow] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [UID, setUID] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState({ audio: "", video: "" });
  const [screenShare, setScreenShare] = useState({ mode: false, track: "" });
  const [participants, setParticipants] = useState([]);
  const [rtmClient, setRtmClient] = useState(null);
  const [channelRes, setChannelRes] = useState(null);
  const [totalMembers, setTotalMembers] = useState(0);
  const [chats, setChats] = useState([]);
  const [showCtrl, setShowCtrl] = useState({
    showParticipants: false,
    showLiveChat: false,
  });
  const [inputUsername, setInputUsername] = useState("");
  const displayName = sessionStorage.getItem("username");

  useEffect(() => {
    if (showCtrl.showParticipants || showCtrl.showLiveChat) {
      const elem = document.getElementById("video-holder");
      elem.scrollTop = 0;
      elem.style.overflow = "hidden";
    }
  }, [showCtrl.showParticipants, showCtrl.showLiveChat]);

  const updateMemberTotal = async (members) => {
    setTotalMembers(members.length);
  };

  const handleMemberJoined = async (MemberId) => {
    const members = await channelRes.getMembers();
    updateMemberTotal(members);
    setParticipants((prev) => [...prev, MemberId]);
    await rtmClient.getUserAttributesByKeys(String(MemberId), ["name"]);
  };

  const handleMemberLeft = async (MemberId) => {
    const members = await channelRes.getMembers();
    updateMemberTotal(members);
    setParticipants((prev) => prev.filter((id) => id !== MemberId));
  };

  const leaveRoom = async () => {
    router.push("/");
  };

  const getMembers = async (channelResIn) => {
    const members = await channelResIn.getMembers();
    updateMemberTotal(members);
    members.forEach((id) => {
      setParticipants((prev) => [...prev, id]);
    });
  };

  const handleChannelMessage = async (messageData, MemberId) => {
    let data = JSON.parse(messageData.text);
    if (data.type === "chat") {
      setChats((prev) => [
        ...prev,
        { displayName: data.displayName, message: data.message },
      ]);
    }
  };

  var sendFile = function () {
    // Select the local file.
    var input = document.getElementById("file");
    // Turn the file message to a binary file.
    var file = AC.utils.getFileUrl(input);
    var allowType = {
      jpg: true,
      gif: true,
      png: true,
      bmp: true,
      zip: true,
      txt: true,
      doc: true,
      pdf: true,
    };
    if (file.filetype.toLowerCase() in allowType) {
      var option = {
        // Set the message type.
        type: "file",
        file: file,
        // Set the username of the message receiver.
        to: "252378044497921",
        // Set the chat type.
        chatType: "chatRoom",
        // Occurs when the file fails to be uploaded.
        onFileUploadError: function () {
          console.log("onFileUploadError");
        },
        // Reports the progress of uploading the file.
        onFileUploadProgress: function (e) {
          console.log(e);
        },
        // Occurs when the file is uploaded.
        onFileUploadComplete: function () {
          console.log("onFileUploadComplete");
        },
        ext: { file_length: file.data.size },
      };
      // Create a file message.
      var msg = AC.message.create(option);
      // Call send to send the file message.
      conn
        .send(msg)
        .then((res) => {
          // Occurs when the file message is sent.
          console.log("Success");
        })
        .catch((e) => {
          // Occurs when the file message fails to be sent.
          console.log("Fail");
        });
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (joined) {
      const displayName = sessionStorage.getItem("username");
      let message = e.target.message.value;
      await channelRes.sendMessage({
        text: JSON.stringify({ type: "chat", message, displayName }),
      });
      setChats((prev) => [...prev, { displayName, message }]);
    } else {
      alert("You must join the room first");
    }
    e.target.reset();
  };
  const initRTM = async (uid) => {
    try {
      let rtmClientIn = AgoraRTM.createInstance(APP_ID);
      await rtmClientIn.login({ uid: String(uid), token });
      await rtmClientIn.addOrUpdateLocalUserAttributes({
        name: sessionStorage.getItem("username"),
      });
      let channelResIn = rtmClientIn.createChannel(channel);
      await channelResIn.join();
      setChannelRes(channelResIn);
      setRtmClient(rtmClientIn);
      await rtmClientIn.getUserAttributesByKeys(String(uid), ["name"]);
    } catch (err) {
      console.error("Failed to initialize RTM:", err);
    }
  };

  useEffect(() => {
    if (channelRes && rtmClient) {
      channelRes.on("MemberJoined", handleMemberJoined);
      channelRes.on("MemberLeft", handleMemberLeft);
      channelRes.on("ChannelMessage", handleChannelMessage);
      getMembers(channelRes);
    }
  }, [channelRes, rtmClient]);

  const joinRoom = async () => {
    try {
      const uid = await client.join(APP_ID, channel, token, null);
      setUID(uid);

      // Create audio track
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      setUsers((prev) => [...prev, { uid, audioTrack }]);

      // Check available cameras
      const devices = await AgoraRTC.getDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");

      if (cameras.length > 0) {
        // Create video track if camera is available
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        setUsers((prev) =>
          prev.map((user) => {
            if (user.uid === uid) {
              return { ...user, videoTrack };
            }
            return user;
          })
        );
        client.publish([audioTrack, videoTrack]);
        setLocalTracks({ audio: audioTrack, video: videoTrack });
        setJoined(true);
      } else {
        // Publish only audio track if no camera is available
        client.publish([audioTrack]);
        setLocalTracks({ audio: audioTrack });
        setJoined(true);
        console.warn("No camera available, joining with audio only.");
      }

      initRTM(uid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserPublished = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((prev) => [...prev, user]);
    }
    const elementToRemove = document.getElementById(user.uid);
    if (elementToRemove) {
      elementToRemove.remove();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((prev) => prev.filter((u) => u.uid !== user.uid));
  };

  const handleMuteCamera = async (user) => {
    if (user.videoTrack.muted === false) {
      await user.videoTrack.setMuted(true);
    } else if (user.videoTrack.muted === true) {
      await user.videoTrack.setMuted(false);
    }
  };
  const handleMuteMic = async (user) => {
    if (user.audioTrack.muted === false) {
      await user.audioTrack.setMuted(true);
    } else if (user.audioTrack.muted === true) {
      await user.audioTrack.setMuted(false);
    }
  };
  const handleScreenShare = async () => {
    if (!screenShare.mode) {
      try {
        const screenShareTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "720p_1",
        });

        // Ekran paylaşımını başlat
        if (localTracks.video) {
          await client.unpublish(localTracks.video);
        }

        setUsers((prev) =>
          prev.map((user) =>
            user.uid === UID ? { ...user, screenShareTrack } : user
          )
        );

        await client.publish(screenShareTrack);
        screenShareTrack.play(screenShareRef.current);
        setScreenShare({ mode: true, track: screenShareTrack });
        screenShareRef.current.classList.remove("hidden");
      } catch (error) {
        console.error("Error starting screen share:", error);
      }
    } else {
      try {
        // Ekran paylaşımını durdur
        if (screenShare.track) {
          await client.unpublish(screenShare.track);
          screenShare.track.stop();
        }

        setUsers((prev) =>
          prev.map((user) =>
            user.uid === UID ? { ...user, screenShareTrack: null } : user
          )
        );

        if (localTracks.video) {
          await client.publish(localTracks.video);
        }

        setScreenShare({ mode: false, track: null });
        screenShareRef.current.classList.add("hidden");
      } catch (error) {
        console.error("Error stopping screen share:", error);
      }
    }
  };

  useEffect(() => {
    client.on("user-published", handleUserPublished);
    client.on("user-left", handleUserLeft);
    window.addEventListener("beforeunload", leaveRoom);
    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-left", handleUserLeft);
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, []);

  const [roomToken, setRoomToken] = useState(null);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const parts = window.location.href.split("/");
    const uuidTokenString = parts[parts.length - 3];
    const roomTokenString = parts[parts.length - 2];
    const [uuidData] = uuidTokenString
      .split("/")
      .map((part) => part.split("=")[1]);
    const [roomTokenData] = roomTokenString
      .split("/")
      .map((part) => part.split("=")[1]);
    setUuid(uuidData);
    setRoomToken(roomTokenData);
  }, []);

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

  useEffect(() => {
    const parts = window.location.href.split("/");
    const role = parts[parts.length - 1];
    const [roleData] = role.split("/").map((part) => part.split("=")[1]);
    setRole(roleData);
  }, []);

  useEffect(() => {
    const shareScreen = document.getElementById("share-screen");
    users.forEach((user) => {
      if (user._videoTrack && user._videoTrack._ID.includes("track-video-")) {
        // Append the element to shareScreen
        const videoElement = document.createElement("div");
        videoElement.id = user.uid; // Assuming user.uid can be used as a unique identifier
        videoElement.classList.add("video-element"); // Add your CSS class here

        // Append the element to shareScreen
        shareScreen.appendChild(videoElement);

        // Optionally, you can also play the video track here
        user._videoTrack.play(videoElement);
      }
    });
  }, [users]);
  console.log(users);
  return displayName !== null ? (
    <div className="h-screen overflow-y-auto">
      <nav className="relative bg-gray-100  flex items-center justify-between h-[10vh] px-4 lg:px-8">
        <div className="timerArea flex flex-row items-center justify-center">
          <div className="w-5 h-5 bg-red-600 rounded-full mr-3 blinking"></div>
          <div className="flex flex-col items-center justify-center">
            <b className="text-lg cursor-pointer text-gray-500">
              Toplantı Süresi
            </b>
            <b className="text-lg cursor-pointer text-gray-600">
              {formatTime(timeElapsed)}
            </b>
          </div>
        </div>
        <b className="text-xl lg:text-3xl cursor-pointer text-premiumOrange font-bold">
          Ofistik
        </b>
        <button
          className="rounded-xl bg-premiumOrange lg:px-8 lg:py-2 px-3 py-1 text-gray-100 font-bold text-sm lg:text-base"
          onClick={async () => {
            router.push("/"); //TOPLANTI BİTTİ SAYFASI YAP
          }}
        >
          Toplantıdan Ayrıl
          <i class="fa-solid fa-arrow-right-from-bracket ml-2"></i>
        </button>

        {/* Absolutes */}
        <div
          className="absolute top-[102%] z-20 left-0 flex items-center justify-center cursor-pointer h-12 w-12 rounded-sm bg-orange-500 lg:hidden"
          onClick={() =>
            setShowCtrl((prev) => ({
              ...prev,
              showParticipants: !showCtrl.showParticipants,
            }))
          }
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <small className="w-4 h-4 rounded-md flex items-center justify-center bg-slate-900">
            0
          </small>
        </div>

        <div
          className="absolute top-[102%] z-20 right-0 flex items-center justify-center cursor-pointer h-12 w-12 rounded-sm bg-orange-500 lg:hidden"
          onClick={() =>
            setShowCtrl((prev) => ({
              ...prev,
              showLiveChat: !showCtrl.showLiveChat,
            }))
          }
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
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>
      </nav>
      <section className="h-[90vh] flex justify-between overflow-hidden">
        {/* Participants */}
        {showParticipants && (
          <Participants
            showCtrl={showCtrl}
            setShowCtrl={setShowCtrl}
            rtmClient={rtmClient}
            totalMembers={totalMembers}
            participants={participants}
          />
        )}

        {/* Main Screen */}
        <MainScreen
          channel={channel}
          setShowParticipants={setShowParticipants}
          showParticipants={showParticipants}
          setChatShow={setChatShow}
          chatShow={chatShow}
          handleMuteMic={handleMuteMic}
          joined={joined}
          setJoined={setJoined}
          joinRoom={joinRoom}
          localTracks={localTracks}
          setLocalTracks={setLocalTracks}
          handleMuteCamera={handleMuteCamera}
          users={users}
          UID={UID}
          screenShareRef={screenShareRef}
          handleScreenShare={() => handleScreenShare(screenShareRef)}
          roomToken={roomToken}
          uid={UID}
          uuid={uuid}
        />

        {/* Live Chat */}
        {chatShow && (
          <LiveChat
            sendFile={sendFile}
            showCtrl={showCtrl}
            sendMessage={sendMessage}
            chats={chats}
          />
        )}
      </section>

      {(showCtrl.showLiveChat || showCtrl.showParticipants) && (
        <div
          className="fixed z-[22] h-[90vh] w-full top-[10vh] left-0 bg-slate-400/50"
          onClick={() =>
            setShowCtrl((prev) => ({
              ...prev,
              showLiveChat: false,
              showParticipants: false,
            }))
          }
        ></div>
      )}
    </div>
  ) : (
    <div className="w-screen h-screen top-0 left-0 flex flex-col items-center justify-center bg-gray-100">
      <div className="titleArea m-5">
        <h1 className="text-xl lg:text-3xl text-center text-premiumOrange font-bold">
          Ofistik Randevu Servisi
        </h1>
      </div>
      <div className=" h-auto max-h-screen overflow-y-auto bg-gray-50 rounded-3xl p-8 mx-8 lg:mx-0">
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="name"
            className="text-gray-600 font-semibold text-sm lg:text-base"
          >
            İsminiz
          </label>
          <input
            type="text"
            className="h-[44px] bg-gray-200 rounded-xl p-5 focus:outline-none"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
          <button
            className="mt-3 text-md lg:text-base rounded-2xl bg-premiumOrange text-white px-3 py-3 font-semibold hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500"
            onClick={() => {
              if (inputUsername) {
                sessionStorage.setItem("username", inputUsername);
                window.location.reload(); // Reload the entire page
              } else {
                alert("Lütfen bir isim giriniz");
              }
            }}
          >
            Katıl
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
