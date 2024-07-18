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
    if (!showChat && showParticipants) {
      setSize("64vw");
    } else if (!showChat && !showParticipants) {
      setSize("74vw");
    } else if (showParticipants && showChat) {
      setSize("79vw");
    } else if (!showParticipants && showChat && !isMobile) {
      setSize("89vw");
    } else if (!showParticipants && showChat && isMobile) {
      setSize("79vw");
    }
  }, [showChat, showParticipants]);

  return (
    <div
      id="white-board"
      style={{
        width: showWhiteboardLarge === false ? "22vw" : size,
        height: showWhiteboardLarge === false ? "25vh" : "82vh",
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
