"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAPI } from "@/services/fetchAPI";

function Page() {
  const router = useRouter();

  const [roomLogin, setRoomLogin] = useState({
    username:
      typeof window !== "undefined"
        ? sessionStorage.getItem("username") || ""
        : "",
    roomName: "",
  });
  const [token, setToken] = useState("");
  const [channel, setChannel] = useState("");
  const [uid, setUid] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(true);

  const closeRoomModal = () => setShowCreateRoom(false);

  const handleRoomSubmit = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      sessionStorage.setItem("username", String(roomLogin.username));
    }

    try {
      const response = await getAPI(
        `/agora?channelName=${roomLogin.roomName}&uid=${roomLogin.username}`
      );
      const token = response.token;
      setChannel(roomLogin.roomName);
      setToken(token);
      setUid(roomLogin.username);

      router.push(`/live/${roomLogin.roomName}`);
      closeRoomModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showCreateRoom && (
        <div className="fixed z-20 w-screen h-screen top-0 left-0 flex items-center justify-center bg-slate-800/50">
          <div className="w-[98vw] h-auto max-h-screen overflow-y-auto border border-orange-500 bg-slate-900 rounded-lg md:w-[500px] md:h-[400px]">
            <div className="py-3 bg-slate-800 flex items-center justify-between">
              <b className="text-lg w-[70%] text-end font-bold">
                Toplantı Başlat
              </b>
              <b className="w-[30%] pe-2 text-end">
                <span onClick={closeRoomModal} className="cursor-pointer">
                  X
                </span>
              </b>
            </div>
            <form
              onSubmit={handleRoomSubmit}
              className="px-6 py-10 flex flex-col gap-4"
            >
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="name">İsminiz</label>
                <input
                  type="text"
                  className="h-[44px] bg-slate-800 rounded-lg p-3 focus:outline-none focus:border focus:border-orange-500"
                  value={roomLogin.username}
                  onChange={(e) =>
                    setRoomLogin((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="roomName">Oda Numaranız</label>
                <input
                  type="text"
                  className="h-[44px] bg-slate-800 rounded-lg p-3 focus:outline-none focus:border focus:border-orange-500"
                  value={roomLogin.roomName}
                  onChange={(e) =>
                    setRoomLogin((prev) => ({
                      ...prev,
                      roomName: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 rounded-md bg-orange-500 px-3 py-3 font-bold"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ff8c00, #ff2f96)",
                }}
              >
                Başlat
              </button>
            </form>
          </div>
        </div>
      )}
      {token && (
        <div className="m-10 w-96 flex flex-wrap">
          <a
            href={`/live/${channel}?token=${token}&uid=${uid}`}
            className="text-sm "
          >
            {`${process.env.NEXT_PUBLIC_URL}/live/${channel}?token=${token}&uid=${uid}`}
          </a>
        </div>
      )}
    </>
  );
}

export default Page;
