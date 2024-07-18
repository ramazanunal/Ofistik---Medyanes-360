import React, { memo, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VideoPlayer = memo(
  ({
    user,
    UID,
    usersNumber,
    showWhiteboardLarge,
    role,
    showWhiteboard,
    closeWhiteboard,
    hasSmallViewScreen1,
  }) => {
    const ref = useRef();
    const isMobile = window.innerWidth < 768;
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
    }, [user, UID]);

    const enLargeFrame = (event) => {
      const shareScreen = document.getElementById("share-screen");
      const targetId = event.currentTarget.id;
      const videoHolder = document.querySelector(`#userBoxForCam-${targetId}`);
      const shareScreen1 = document.getElementById("share-screen1");
      const shareScreenElement = document.getElementById("share-screen");
      const videoPlayerElement = ref.current;
      if (shareScreen1) {
        if (shareScreenElement) {
          const smallViewElement = shareScreenElement.querySelector("div");
          if (smallViewElement) {
            if (!shareScreen1.contains(event.currentTarget)) {
              let child = shareScreen1.children[0];
              if (child) {
                const originalHolder = document.querySelector(
                  `#userBoxForCam-${child.id}`
                );
                if (originalHolder) {
                  originalHolder.insertBefore(child, originalHolder.firstChild);
                }
              }
              shareScreen1.classList.remove("hidden");
              shareScreen1.appendChild(event.currentTarget);
            } else {
              videoHolder.insertBefore(
                shareScreen1.children[0],
                videoHolder.firstChild
              );
              shareScreen1.classList.add("hidden");
            }
          } else {
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
          }
        }
      } else {
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
      }
    };

    const [isInShareScreen, setIsInShareScreen] = useState(false);
    const [isInShareScreen1, setIsInShareScreen1] = useState(false);

    useEffect(() => {
      const updateScreenState = () => {
        const shareScreenElement = document.getElementById("share-screen");
        const shareScreen1Element = document.getElementById("share-screen1");
        const videoPlayerElement = ref.current;

        if (shareScreenElement && videoPlayerElement) {
          setIsInShareScreen(shareScreenElement.contains(videoPlayerElement));
        }
        if (shareScreen1Element && videoPlayerElement) {
          setIsInShareScreen1(shareScreen1Element.contains(videoPlayerElement));
        }
        // Update class based on shareScreen1 class
        if (shareScreen1Element) {
          const shareScreen1Classes = shareScreen1Element.className.split(" ");
          const isFullScreen =
            shareScreen1Classes.includes("w-[100%]") &&
            shareScreen1Classes.includes("h-[90%]");
          const isSmallScreen =
            shareScreen1Classes.includes("!w-[400px]") &&
            shareScreen1Classes.includes("!h-[250px]");

          if (isFullScreen) {
            videoPlayerElement.classList.add("bigView");
            videoPlayerElement.classList.remove("smallView");
          } else if (isSmallScreen) {
            videoPlayerElement.classList.add("smallView");
            videoPlayerElement.classList.remove("bigView");
          }
        } else if (shareScreenElement) {
          const shareScreenClasses = shareScreenElement.className.split(" ");
          const isFullScreen =
            shareScreenClasses.includes("w-[100%]") &&
            shareScreenClasses.includes("h-[90%]");
          const isSmallScreen =
            shareScreenClasses.includes("!w-[400px]") &&
            shareScreenClasses.includes("!h-[250px]");

          if (isFullScreen) {
            videoPlayerElement.classList.add("bigView");
            videoPlayerElement.classList.remove("smallView");
          } else if (isSmallScreen) {
            videoPlayerElement.classList.add("smallView");
            videoPlayerElement.classList.remove("bigView");
          }
        }
      };

      updateScreenState();
    });

    return (
      <>
        <div
          ref={ref}
          id={user.uid}
          onClick={enLargeFrame}
          className={`userCam ${
            isInShareScreen ? "inScreen" : ""
          }  overflow-hidden ${
            isInShareScreen1 ? "inScreen1" : ""
          } cursor-pointer ${
            showWhiteboard ? "openWhite " : "closeWhite"
          }  md:w-[13vw] md:h-[20vh] w-[80vw] h-[40vh] videoPlayer rounded-t-2xl`}
        ></div>
      </>
    );
  }
);

export default VideoPlayer;
