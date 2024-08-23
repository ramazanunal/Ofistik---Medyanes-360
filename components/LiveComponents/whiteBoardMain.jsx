import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React, { useEffect, useState } from "react";

function WhiteBoardMain({
  roomToken,
  uid,
  uuid,
  showChat,
  showParticipants,
  showWhiteboardLarge,
}) {
  const [size, setSize] = useState("");
  const isMobile = window.innerWidth < 768;
  let fastboard;
  try {
    fastboard = useFastboard(() => ({
      sdkConfig: {
        appIdentifier: "PFDmUAhSEe-X_REUu_elzA/kmPn7ALITrakJQ",
        region: "us-sv",
      },
      joinRoom: {
        uid: uid,
        uuid: uuid,
        roomToken: roomToken,
      },
    }));
  } catch (error) {
    console.error("An error occurred while initializing fastboard:", error);
  }

  useEffect(() => {
    // showChat ve showParticipants durumlarına göre genişliği ayarlayın

    if (!showChat && !isMobile) {
      setSize("73vw");
    } else if (showChat && !isMobile) {
      setSize("97vw");
    } else if (showChat && isMobile) {
      setSize("96vw");
    } else if (!showChat && isMobile) {
      setSize("96vw");
    }
  }, [showChat, isMobile]);
  const height =
    showWhiteboardLarge === false ? "25vh" : isMobile ? "70vh" : "82vh";

  return (
    <div
      id="white-board"
      style={{
        width: showWhiteboardLarge === false ? "22vw" : size,
        height: height,
        border: "1px solid",
        borderRadius: "15px",
        borderColor: "hsl(215, 20%, 75%)",
        background: "white",
      }}
    >
      <Fastboard app={fastboard} />
    </div>
  );
}

export default WhiteBoardMain;
