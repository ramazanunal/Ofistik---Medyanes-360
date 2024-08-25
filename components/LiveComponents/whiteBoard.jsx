import React, { useEffect, useRef } from "react";
import { WhiteWebSdk } from "white-web-sdk";

const WhiteboardContainer = ({ roomUid, roomToken }) => {
  const whiteboardRef = useRef(null);

  useEffect(() => {
    const whiteWebSdk = new WhiteWebSdk({
      appIdentifier: "PFDmUAhSEe-X_REUu_elzA/iqDTdcAIEz2DlQ",
      region: "us-sv",
    });

    const joinWhiteboard = async () => {
      try {
        const room = await whiteWebSdk.joinRoom({
          uuid: roomUid,
          roomToken: roomToken,
        });
        room.bindHtmlElement(whiteboardRef.current);
      } catch (error) {
        console.error("Error joining whiteboard room:", error);
      }
    };

    joinWhiteboard();
  }, []);

  return <div ref={whiteboardRef} id="whiteboard"></div>;
};

export default WhiteboardContainer;
