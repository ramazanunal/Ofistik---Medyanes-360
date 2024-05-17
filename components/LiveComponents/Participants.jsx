import React, { memo } from "react";

const Participants = memo(
  ({ showCtrl, setShowCtrl, rtmClient, totalMembers, participants }) => {
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
      <div
        className={`h-full border-r border-r-slate-400 overflow-hidden transition-[width] fixed left-0 ${
          showCtrl.showParticipants ? "w-[90vw] md:w-[40vw] top-[10vh]" : "w-0"
        } z-30 bg-gray-200 lg:relative lg:w-[15vw]`}
      >
        <div className="relative bg-premiumOrange m-3 rounded-xl h-[10vh] font-bold flex items-center justify-center gap-4">
          <span className="text-xl text-gray-100">Katılımcılar</span>
          <div className="bg-slate-950 text-white w-8 h-8 flex justify-center items-center rounded-xl">
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
        <div className="mt-4 px-4 flex flex-col gap-3">
          {participants.map((participantId) => {
            getName(participantId);

            return (
              <div key={participantId} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span
                  id={`user-${participantId}`}
                  className="truncate text-gray-700 font-semibold"
                >
                  {participantId}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default Participants;
