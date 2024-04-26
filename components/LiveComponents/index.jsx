"use client";
import { useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useParams, useSearchParams } from "next/navigation";

const LiveContainer = () => {
  const [videocall, setVideocall] = useState(true);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token || token == "") return <div>Invalid Token</div>;
  if (!params.ChName) return <div>Invalid URL</div>;
  if (!process.env.NEXT_PUBLIC_AGORA_APP_ID)
    return <div>Invalid Agora App ID</div>;
  if (!process.env.NEXT_PUBLIC_AGORA_APP_CERTIFICATE)
    return <div>Invalid Agora App Certificate</div>;

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
    appCertificate: process.env.NEXT_PUBLIC_AGORA_APP_CERTIFICATE,
    channel: params.ChName,
    token: token,
    role: isHost ? "host" : "audience",
    layout: isPinned ? layout.pin : layout.grid,
    enableScreensharing: true,
  };

  console.log("rtcProps", rtcProps);
  return (
    <div className="w-[100vw] h-[100vh] flex flex-1 bg-white">
      <div className="flex flex-col flex-1">
        <h1 className="text-center my-5 text-xl">{params.ChName}</h1>
        {videocall ? (
          <>
            <div className="flex justify-around">
              <p className="w-[200px]" style={{ fontSize: 20 }}>
                You're {isHost ? "a host" : "an audience"}
              </p>
              <button
                className="bg-premiumOrangeBg cursor-pointer rounded-md px-2 py-1 text-white  font-medium"
                onClick={() => setHost(!isHost)}
              >
                Change Role
              </button>
              <button
                className="bg-premiumOrangeBg cursor-pointer rounded-md px-2 py-1 text-white  font-medium"
                onClick={() => setPinned(!isPinned)}
              >
                Change Layout
              </button>
            </div>
            <AgoraUIKit
              rtcProps={rtcProps}
              rtmProps={{ username: username || "user", displayUsername: true }}
              callbacks={{
                EndCall: () => setVideocall(false),
              }}
            />
          </>
        ) : (
          <div className="flex justify-around">
            <input
              className="flex h-6 self-center"
              placeholder="nickname"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>
              Start Call
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveContainer;
