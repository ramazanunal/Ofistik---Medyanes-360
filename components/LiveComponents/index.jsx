"use client";
import { useState } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";

const LiveContainer = () => {
  const [videocall, setVideocall] = useState(true);
  const [isHost, setHost] = useState(true);
  const [isPinned, setPinned] = useState(false);
  const [username, setUsername] = useState("");
  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_AGORA_ID,
    channel: "random",
    token: "007eJxTYNggvHW9QvQD1w1nuL7kmVZE33IS7/2fYqTo5W1483DqcgcFBgMLkxRDk1RTI9PkFJNkS2MLy6TEZGNLY9OkxBRLAwMTlXDNtIZARoYZP1KZGRkgEMRnYyhKzEvJz2VgAAA3SB7c", // add your token if using app in secured mode
    role: isHost ? "host" : "audience",
    layout: isPinned ? layout.pin : layout.grid,
    enableScreensharing: true,
  };
console.log("rtcProps", rtcProps)
  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <h1 style={styles.heading}>Agora React Web UI Kit</h1>
        {videocall ? (
          <>
            <div style={styles.nav}>
              <p style={{ fontSize: 20, width: 200 }}>
                You're {isHost ? "a host" : "an audience"}
              </p>
              <button style={styles.btn} onClick={() => setHost(!isHost)}>
                Change Role
              </button>
              <button style={styles.btn} onClick={() => setPinned(!isPinned)}>
                Change Layout
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
          <div style={styles.nav}>
            <input
              style={styles.input}
              placeholder="nickname"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3 style={styles.btn} onClick={() => setVideocall(true)}>
              Start Call
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flex: 1,
    backgroundColor: "#007bff22",
  },
  heading: { textAlign: "center", marginBottom: 0 },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  nav: { display: "flex", justifyContent: "space-around" },
  btn: {
    backgroundColor: "#007bff",
    cursor: "pointer",
    borderRadius: 5,
    padding: "4px 8px",
    color: "#ffffff",
    fontSize: 20,
  },
  input: { display: "flex", height: 24, alignSelf: "center" },
};

export default LiveContainer;
