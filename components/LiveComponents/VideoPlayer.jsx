import React, { memo, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
const VideoPlayer = memo(
  ({ user, UID, usersNumber, showWhiteboardLarge, role, showWhiteboard }) => {
    const ref = useRef();

    useEffect(() => {
      // Oynatma işlemleri
      const playTracks = () => {
        if (user.videoTrack) {
          console.log("Playing video track for user:", user.uid);
          user.videoTrack.play(ref.current);
        } else if (!user.videoTrack && !user.screenShareTrack) {
          // Eğer video yoksa ve screenShareTrack de yoksa, siyah bir ekran görüntüsü ekleyin
          ref.current.style.backgroundColor = "black";
        }

        if (user.audioTrack && user.uid !== UID) {
          console.log("Playing audio track for user:", user.uid);
          user.audioTrack.play();
        }

        if (user.screenShareTrack) {
          console.log("Playing screen share track for user:", user.uid);
          user.screenShareTrack.play(ref.current);
          if (user.uid !== UID) {
            user.audioTrack.play();
          }
        }
      };

      playTracks();

      // Clean up function
      // return () => {
      //   if (user.videoTrack) {
      //     user.videoTrack.stop();
      //   }
      //   if (user.audioTrack) {
      //     user.audioTrack.stop();
      //   }
      //   if (user.screenShareTrack) {
      //     user.screenShareTrack.stop();
      //   }
      // };
    }, [user, UID]);

    const enLargeFrame = (event) => {
      const shareScreen = document.getElementById("share-screen");
      const targetId = event.currentTarget.id;
      const videoHolder = document.querySelector(`#userBoxForCam-${targetId}`);

      if (!shareScreen.contains(event.currentTarget)) {
        let child = shareScreen.children[0];
        if (child) {
          const originalHolder = document.querySelector(
            `#userBoxForCam-${child.id}`
          );
          if (originalHolder) {
            originalHolder.insertBefore(child, originalHolder.firstChild);
          }
        }
        shareScreen.classList.remove("hidden");
        shareScreen.appendChild(event.currentTarget);
      } else {
        videoHolder.insertBefore(
          shareScreen.children[0],
          videoHolder.firstChild
        );
        shareScreen.classList.add("hidden");
      }
    };

    return (
      <>
        <div
          ref={ref}
          id={user.uid}
          onClick={enLargeFrame}
          className={`userCam ${
            showWhiteboardLarge ? "smallView" : ""
          } overflow-hidden cursor-pointer ${role} ${
            showWhiteboard ? "" : "openWhite"
          }  w-[13vw] h-[20vh] videoPlayer rounded-t-2xl`}
        ></div>
      </>
    );
  }
);

export default VideoPlayer;
