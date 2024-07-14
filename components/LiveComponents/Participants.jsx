import React, { memo } from "react";
import profile from "@/assets/icons/profile.png";
import Image from "next/image";

const Participants = memo(
  ({
    showCtrl,
    setShowCtrl,
    rtmClient,
    totalMembers,
    participants,
    show,
    openParticipants,
  }) => {
    const getName = async (participantId) => {
      let nameOfUser = "";
      try {
        setTimeout(async () => {
          const updateNameHTML = document.getElementById(
            `user-${participantId}`
          );

          const usernamePromise = rtmClient.getUserAttributesByKeys(
            participantId,
            ["name"]
          );
          const username = await usernamePromise;
          const { name } = username;
          nameOfUser = name;

          // return name;
          updateNameHTML.textContent = nameOfUser;
        }, 100);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <div className="p-5 pt-2 bg-gray-100 relative">
        <button
          onClick={openParticipants}
          className="bg-premiumOrange w-10 h-10 rounded-full text-white absolute top-8 right-2 z-40 hover:scale-125 transform duration-500"
        >
          <i class={`fa-solid fa-chevron-${show ? "left" : "right"}`}></i>
        </button>
        <div
          className={`h-[96vh] fixed left-0 ${
            show
              ? " animate__animated animate__fadeInLeft"
              : "hidden animate__animated animate__fadeOutLeft"
          } z-30 bg-white lg:relative rounded-2xl lg:w-[12vw]`}
        >
          <div className="relative m-3 p-5 font-bold flex items-center justify-center gap-4 border-b-2 border-gray-300">
            <span className="text-xl text-gray-600">Katılımcılar</span>
            <div className="bg-premiumOrange text-white w-8 h-8 flex justify-center items-center rounded-full">
              {totalMembers}
            </div>

            <button
              className="font-bold text-2xl absolute top-[3vh] left-2 lg:hidden"
              onClick={() =>
                setShowCtrl((prev) => ({
                  ...prev,
                  showParticipants: !showCtrl.showParticipants,
                }))
              }
            >
              X
            </button>
          </div>
          {/* Members */}
          <div className="mt-4 px-4 flex flex-col gap-3 w-full">
            {participants.map((participantId) => {
              getName(participantId);

              return (
                <div
                  key={participantId}
                  className="flex flex-row items-center gap-2"
                >
                  <div className="imageArea border-green-500 border-2 rounded-full">
                    <Image src={profile} width={50} height={50} />
                  </div>

                  <span
                    id={`user-${participantId}`}
                    className="truncate text-gray-700 font-semibold text-right"
                  >
                    {participantId}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

export default Participants;
