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
      <div className="w-screen h-screen top-0 left-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="titleArea m-5">
          <h1 className="text-xl lg:text-3xl text-center text-premiumOrange font-bold">
            Ofistik Randevu Servisi
          </h1>
        </div>
        <div className=" h-auto max-h-screen overflow-y-auto bg-gray-50 rounded-3xl md:w-[500px] md:h-[400px] mx-8 lg:mx-0">
          <div className="py-3 bg-gray flex items-center justify-center">
            <h1 className="lg:text-xl text-md text-center font-semibold text-gray-600 mt-3">
              Toplantı Oluştur
            </h1>
          </div>
          <form
            onSubmit={handleRoomSubmit}
            className="px-6 py-3 flex flex-col gap-4"
          >
            <div className="flex w-full flex-col gap-2">
              <label
                htmlFor="name"
                className="text-gray-600 font-semibold text-sm lg:text-base"
              >
                İsminiz
              </label>
              <input
                type="text"
                className="h-[44px] bg-gray-100 rounded-xl p-5 focus:outline-none"
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
              <label
                htmlFor="roomName"
                className="text-gray-600 font-semibold text-sm lg:text-base"
              >
                Oda İsmi
              </label>
              <input
                type="text"
                className="h-[44px] bg-gray-100 rounded-xl p-5 focus:outline-none"
                value={roomLogin.roomName}
                onChange={(e) =>
                  setRoomLogin((prev) => ({
                    ...prev,
                    roomName: e.target.value,
                  }))
                }
                required
              />
              <div className="flex items-center justify-start ml-1 mt-2">
                <i class="fa-solid fa-circle-exclamation text-red-600 text-sm mr-2"></i>
                <h1 className="warningText text-red-600 text-sm">
                  Müşteriniz belirtilen oda ismi ile randevunuza katılacaktır.
                </h1>
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 text-md lg:text-base rounded-2xl bg-premiumOrange text-white px-3 py-3 font-semibold hover:bg-gray-200 hover:text-premiumOrange transition-all duration-500"
            >
              Başlat
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
