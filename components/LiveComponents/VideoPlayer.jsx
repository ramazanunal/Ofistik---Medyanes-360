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
      const videoHolder = document.getElementById("userVideo");
      const shareScreen = document.getElementById("share-screen");
      // if (document.getElementById("white-board")) {
      //   toast.error("Kamerayı büyütmek için beyaz tahtayı kapatın!");
      //   return;
      // }
      if (event.target.parentNode.parentNode.parentNode.id !== shareScreen.id) {
        let child = shareScreen.children[0];
        if (child) {
          videoHolder.appendChild(child);
        }
        shareScreen.classList.remove("hidden");
        shareScreen.appendChild(event.currentTarget);
      } else {
        videoHolder.appendChild(
          document.getElementById("share-screen").children[0]
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
          className={`userCam w-[300px] my-5 h-[300px] ${
            showWhiteboardLarge ? "smallView" : ""
          } overflow-hidden cursor-pointer rounded-2xl mr-3 ${role} ${
            showWhiteboard ? "" : "openWhite"
          } border-2 m-auto border-gray-300 md:w-[170px] md:h-[130px] xl:w-[200px] xl:h-[150px] videoPlayer`}
        ></div>
      </>
    );
  }
);

export default VideoPlayer;
