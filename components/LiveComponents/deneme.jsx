import React, { useEffect } from "react";
import "./style.css";
import AgoraAppBuilder from "@appbuilder/react";

function Deneme() {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraAppBuilder.View />
    </div>
  );
}

export default Deneme;
