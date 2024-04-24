"use client";
import { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Divide } from "lucide-react";

const LiveContainer = () => {
  const [videoCall, setVideoCall] = useState(false);

  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_ID,
    channel: "random",
    token:
      "007eJxTYJBb4/5EKlSw2XKP9N2zfk4RH19xdAlIfVFP/GtzhW2GkLgCg4GFSYqhSaqpkWlyikmypbGFZVJisrGlsWlSYoqlgYHJFzbNtIZARgZzOxNmRgYIBPHZGIoS81LycxkYALMRHLU=",
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <h3
        className=" my-2 border w-fit rounded-md p-2 px-4 bg-black text-white hover:cursor-pointer"
        onClick={() => setVideoCall(true)}
      >
        Join
      </h3>
    </div>
  );
};

export default LiveContainer;
