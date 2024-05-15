"use client";
import { useState, useEffect } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { getAPI } from "@/services/fetchAPI";

const spaceControl = (token) => token.replace(/ /g, "+");

const LiveContainer = () => {
  const [videocall, setVideocall] = useState(true);
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const uidParam = searchParams.get("uid");
  const [token, setToken] = useState(tokenParam);
  const [uid, setUid] = useState(uidParam);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState(uidParam || "user");
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      if (!uid || uid === "") {
        console.log("Generated UID:", uid);
        try {
          const response = await getAPI(
            `/agora?channelName=${params.ChName}&uid=${uid}`
          );
          const fetchedToken = response.token;
          setToken(fetchedToken);
          console.log("Fetched Token:", fetchedToken);
          router.push(
            `/live/${params.ChName}?token=${fetchedToken}&uid=${uid}`
          );
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    };
    if (!token) {
      fetchToken();
    }
  }, [uid, params.ChName, router, token]);

  if (!token || token === "") return <div>Invalid or missing token</div>;
  if (!params.ChName) return <div>Invalid URL: Channel name is required</div>;
  if (!process.env.NEXT_PUBLIC_AGORA_APP_ID)
    return <div>Invalid configuration: Agora App ID is missing</div>;
  if (!process.env.NEXT_PUBLIC_AGORA_APP_CERTIFICATE)
    return <div>Invalid configuration: Agora App Certificate is missing</div>;

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
    channel: params.ChName,
    token: spaceControl(token),
    userName: uid,
    uid: uid,
    role: isHost ? "host" : "audience",
    layout: isPinned ? layout.pin : layout.grid,
    enableScreensharing: true,
    screenshare: isScreenSharing,
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
                className="bg-premiumOrangeBg cursor-pointer rounded-md px-2 py-1 text-white font-medium"
                onClick={() => setHost(!isHost)}
              >
                Change Role
              </button>
              <button
                className="bg-premiumOrangeBg cursor-pointer rounded-md px-2 py-1 text-white font-medium"
                onClick={() => setPinned(!isPinned)}
              >
                Change Layout
              </button>
              <button
                className="bg-premiumOrangeBg cursor-pointer rounded-md px-2 py-1 text-white font-medium"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
              >
                {isScreenSharing
                  ? "Stop Screen Sharing"
                  : "Start Screen Sharing"}
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
              onChange={(e) => setUsername(e.target.value)}
            />
            <h3 onClick={() => setVideocall(true)}>Start Call</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveContainer;
