import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React, { useEffect, useState } from "react";

function WhiteBoardMain({ roomToken, uid, uuid, showChat, showParticipants }) {
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
    if (showChat && showParticipants) {
      setSize("50vw");
    } else if (showChat && !showParticipants) {
      setSize("65vw");
    } else if (showParticipants && !showChat) {
      setSize("70vw");
    } else if (!showParticipants && !showChat) {
      setSize("80vw");
    }
  }, [showChat, showParticipants]);

  return (
    <div
      id="white-board"
      style={{
        width: size,
        height: "85vh",
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
