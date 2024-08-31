"use client";
import { useEffect, useState } from "react";
import { postAPI } from "@/services/fetchAPI";

export default function CardPayment({ profileInfo }) {
  const [amount, setAmount] = useState(0);
  const [wallet, setWallet] = useState(0);
  console.log(profileInfo);

  const fetchWallet = async () => {
    if (profileInfo) {
      const { userId } = profileInfo;
      try {
        const res = await postAPI("/wallet", JSON.stringify({ userId }));
        console.log(res.data.amount);
        setWallet(res.data.amount);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchWallet();
  });

  function handlePayment() {
    postAPI(
      "/payment",
      JSON.stringify({
        userId: profileInfo.userId,
        amount,
      })
    );
    fetchWallet();
  }
  useEffect(() => {
    const fetchWallet = async () => {
      if (profileInfo) {
        const { userId } = profileInfo;
        try {
          const res = await postAPI("/wallet", JSON.stringify({ userId }));
          console.log(res.data.amount);
          setWallet(res.data.amount);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchWallet();
  });
  return (
    <div className="h-full ">
      <div className=" bg-white p-6 mx-auto rounded-md h-2/3 w-96 shadow">
        <div className="text-center font-medium text-2xl">{wallet}</div>
        <div className="flex  gap-x-1 h-10 mt-4 justify-evenly">
          <button
            onClick={() => setAmount(50)}
            className={`shadow rounded h-full w-full flex justify-center items-center transition-colors duration-100 ${
              amount === 50 ? "bg-green-500" : "bg-inherit"
            }`}
          >
            50
          </button>
          <button
            onClick={() => setAmount(150)}
            className={`shadow rounded h-full w-full flex justify-center items-center transition-colors duration-100 ${
              amount === 150 ? "bg-green-500" : "bg-inherit"
            }`}
          >
            150
          </button>
          <button
            onClick={() => setAmount(300)}
            className={`shadow rounded h-full w-full flex justify-center items-center transition-colors duration-100 ${
              amount === 300 ? "bg-green-500" : "bg-inherit"
            }`}
          >
            300
          </button>
          <button
            onClick={() => setAmount(500)}
            className={`shadow rounded h-full w-full flex justify-center items-center transition-colors duration-100 ${
              amount === 500 ? "bg-green-500" : "bg-inherit"
            }`}
          >
            500
          </button>
          <button
            onClick={() => setAmount(1000)}
            className={`shadow rounded h-full w-full flex justify-center items-center transition-colors duration-100 ${
              amount === 1000 ? "bg-green-500" : "bg-inherit"
            }`}
          >
            1000
          </button>
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handlePayment}
            className="border p-2 rounded-md bg-green-500 hover:bg-green-700 text-white transition-all duration-75 ease-linear"
          >
            Ödeme Yap
          </button>
        </div>
      </div>
    </div>
  );
}
