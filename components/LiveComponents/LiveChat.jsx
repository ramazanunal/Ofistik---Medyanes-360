import React, { memo, useRef, useEffect, useState } from "react";

const LiveChat = memo(({ showCtrl, sendMessage, sendFile, chats }) => {
  const chatRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      sendFile(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div
      className={`h-full border-l border-l-slate-400 flex flex-col fixed right-0 overflow-hidden ${
        showCtrl.showLiveChat ? "w-[90vw] md:w-[45vh] top-[10vh]" : "w-0"
      } z-30 bg-[#313131] transition-[width] lg:relative lg:w-[20vw]`}
    >
      <div className="h-[70vh] p-2 w-full overflow-y-auto flex flex-col gap-4 lg:h-[80vh]">
        {chats.map((chat, id) => (
          <div
            key={id}
            className="bg-gray-300 w-fit rounded-md p-2 flex flex-col gap-2"
          >
            <span className="text-green-500 font-semibold">
              {chat.displayName}
            </span>
            <span className="font-medium">{chat.message}</span>
            {chat.fileUrl && (
              <a
                href={chat.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {chat.fileName}
              </a>
            )}
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <form
        className="h-[20vh] w-full p-2 flex justify-center bg-[#313131] lg:h-[10vh]"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          name="message"
          className="h-[44px] w-full bg-gray-300 rounded-lg p-3 focus:outline-none focus:border focus:border-orange-500 placeholder:text-slate-600"
          placeholder="Mesaj Gönder..."
          autoComplete="off"
        />
      </form>
      <form
        className="h-[20vh] w-full p-2 flex justify-center bg-[#313131] lg:h-[10vh]"
        onSubmit={handleFileSubmit}
      >
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="w-full bg-gray-300 rounded-lg p-3"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded-lg ml-2"
        >
          Dosya Gönder
        </button>
      </form>
    </div>
  );
});

export default LiveChat;
