"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAPI } from "@/services/fetchAPI";
import Swal from "sweetalert2";

function Page() {
  const router = useRouter();

  const [roomLogin, setRoomLogin] = useState({
    username:
      typeof window !== "undefined"
        ? sessionStorage.getItem("username") || ""
        : "",
    roomName: "",
  });
  console.log(roomLogin);
  const [token, setToken] = useState("");
  const [channel, setChannel] = useState("");
  const [uid, setUid] = useState("");
  const [showCreateRoom, setShowCreateRoom] = useState(true);
  const [role, setRole] = useState("admin"); // Default role is admin
  const closeRoomModal = () => setShowCreateRoom(false);

  const [roomToken, setRoomToken] = useState(null);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "POST",
          headers: {
            token:
              "NETLESSSDK_YWs9c2ZnWVU0VWF5UGxOS3ktWSZleHBpcmVBdD02MTcxNjAzOTM1OTkyMSZub25jZT05MDMxMTIxMC0xNTFiLTExZWYtYTQzNy04ZDUyNzM4MTAzNTQmcm9sZT0wJnNpZz01OGQ3ZjYwOGEwYTA1MjhmNzg2MjU2N2VjOThlMGVkYTMyMGQ5OWE2YjM2ZmEzYTNkOThmMTU3NTg1ODdiZjQy",
            "Content-Type": "application/json",
            region: "us-sv",
          },
          body: JSON.stringify({}),
        };
        const config1 = {
          method: "POST",
          headers: {
            token:
              "NETLESSSDK_YWs9c2ZnWVU0VWF5UGxOS3ktWSZleHBpcmVBdD02MTcxNjAzOTM1OTkyMSZub25jZT05MDMxMTIxMC0xNTFiLTExZWYtYTQzNy04ZDUyNzM4MTAzNTQmcm9sZT0wJnNpZz01OGQ3ZjYwOGEwYTA1MjhmNzg2MjU2N2VjOThlMGVkYTMyMGQ5OWE2YjM2ZmEzYTNkOThmMTU3NTg1ODdiZjQy",
            "Content-Type": "application/json",
            region: "us-sv",
          },
          body: JSON.stringify({ lifespan: 0, role: "admin" }),
        };

        // Öncelikle odanın UUID'sini alıyoruz
        const roomResponse = await fetch(
          "https://api.netless.link/v5/rooms",
          config
        );

        const roomData = await roomResponse.json();
        const roomUUID = roomData.uuid;

        // Oda tokenini oluşturmak için UUID kullanarak bir istek daha yapıyoruz
        const roomTokenResponse = await fetch(
          `https://api.netless.link/v5/tokens/rooms/${roomUUID}`,
          config1
        );
        const roomTokenData = await roomTokenResponse.json();
        const roomToken = roomTokenData;
        setRoomToken(roomToken);
        setUuid(roomUUID);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleRoomSubmit = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      sessionStorage.setItem("username", String(roomLogin.username));
    }
    Swal.fire({
      title: "Oda Oluşturuluyor...",
      html: "Lütfen bekleyin.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Oda ismine 5 basamaklı rastgele bir sayı ekleyin
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const uniqueRoomName = `${roomLogin.roomName}${randomNum}`;

    try {
      const response = await getAPI(
        `/agora?channelName=${uniqueRoomName}&uid=${roomLogin.username}`
      );
      const token = response.token;
      setChannel(roomLogin.roomName);
      setToken(token);
      setUid(roomLogin.username);
      Swal.close();
      router.push(
        `/live/channelName=${roomLogin.roomName}/uuid=${uuid}/roomToken=${roomToken}/role=${role}`
      );
      closeRoomModal();
    } catch (error) {
      Swal.close();
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
        <div className=" h-auto max-h-screen overflow-y-auto bg-gray-50 rounded-3xl md:w-[500px] md:h-[480px] mx-8 lg:mx-0">
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
                className="h-[44px] bg-gray-200 rounded-xl p-5 focus:outline-none"
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
                htmlFor="role"
                className="text-gray-600 font-semibold text-sm lg:text-base"
              >
                Rol Seçin
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-[44px] bg-gray-200 rounded-xl p-2 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="reader">Reader</option>
              </select>
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
                className="h-[44px] bg-gray-200 rounded-xl p-5 focus:outline-none"
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
                <i className="fa-solid fa-circle-exclamation text-red-600 text-sm mr-2"></i>
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
