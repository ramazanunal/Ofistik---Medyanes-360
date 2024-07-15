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
      setSize("67vw");
    } else if (!showChat && !showParticipants) {
      setSize("77vw");
    } else if (showParticipants && showChat) {
      setSize("82vw");
    } else if (!showParticipants && showChat) {
      setSize("92vw");
    }
  }, [showChat, showParticipants]);

  return (
    <div
      id="white-board"
      style={{
        width: showWhiteboardLarge === false ? "22vw" : size,
        height: showWhiteboardLarge === false ? "25vh" : "85vh",
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
