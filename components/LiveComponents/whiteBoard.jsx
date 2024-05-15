import React, { useEffect, useRef } from "react";
import { WhiteWebSdk } from "white-web-sdk";

const WhiteboardContainer = () => {
  const whiteboardRef = useRef(null);

  useEffect(() => {
    const whiteWebSdk = new WhiteWebSdk({
      appIdentifier: process.env.NEXT_PUBLIC_WHITEBOARD_APP_ID,
      region: "us-sv",
    });

    const joinWhiteboard = async () => {
      try {
        const room = await whiteWebSdk.joinRoom({
          uuid: process.env.NEXT_PUBLIC_WHITEBOARD_ROOM_UUID,
          roomToken: process.env.NEXT_PUBLIC_WHITEBOARD_ROOM_TOKEN,
        });
        room.bindHtmlElement(whiteboardRef.current);
      } catch (error) {
        console.error("Error joining whiteboard room:", error);
      }
    };

    joinWhiteboard();
  }, []);

  return <div ref={whiteboardRef} className="whiteboard-container"></div>;
};

export default WhiteboardContainer;
