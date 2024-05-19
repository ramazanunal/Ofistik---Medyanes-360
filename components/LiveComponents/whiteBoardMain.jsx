import { useFastboard, Fastboard } from "@netless/fastboard-react";
import React from "react";

function WhiteBoardMain({ roomToken, uid, uuid }) {
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

  return (
    <div
      id="white-board"
      style={{
        width: "62vw",
        height: "500px",
        border: "1px solid",
        borderRadius: "15px",
        borderColor: "hsl(215, 20%, 75%)",
        background: "#f1f2f3",
      }}
    >
      <Fastboard app={fastboard} />
    </div>
  );
}

export default WhiteBoardMain;
