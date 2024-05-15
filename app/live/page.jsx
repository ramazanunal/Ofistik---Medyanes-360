"use client";
import React from "react";
import { getAPI } from "@/services/fetchAPI";

function Page() {
  const [token, setToken] = React.useState("");
  const [channel, setChannel] = React.useState("");
  const [uid, setUid] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredChannel = e.target.channel.value;
    const enteredUid = e.target.name.value;
    try {
      const response = await getAPI(
        `/agora?channelName=${enteredChannel}&uid=${enteredUid}`
      );
      const token = response.token;
      setChannel(enteredChannel);
      setToken(token);
      setUid(enteredUid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 mt-20 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        <span className="text-premiumOrange">Ofistik</span> x{" "}
        <span className="text-blue-500">Agora</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mt-6">
          <div>
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Channel Name
            </label>
          </div>
          <div>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              name="channel"
              placeholder="Enter channel name"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mt-6">
          <div>
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              User Name
            </label>
          </div>
          <div>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              id="inline-full-name"
              type="text"
              name="name"
              placeholder="Enter user name"
              required
            />
          </div>
        </div>
        <div className="text-center">
          <button className="inline-flex items-center justify-center px-5 py-3 mt-5 text-base font-medium text-center text-white bg-blue-400 rounded-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Submit
          </button>
        </div>
      </form>
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
    </div>
  );
}

export default Page;
