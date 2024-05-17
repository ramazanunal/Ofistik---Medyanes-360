import React, { memo, useRef, useEffect } from "react";

const LiveChat = memo(({ showCtrl, sendMessage, chats }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div
      className={`h-full border-l border-l-slate-400 flex flex-col fixed right-0 overflow-hidden ${
        showCtrl.showLiveChat ? "w-[90vw] md:w-[45vh] top-[10vh]" : "w-0"
      } z-30 bg-gray-200 transition-[width] lg:relative lg:w-[20vw]`}
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
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <form
        className="h-[20vh] w-full p-2 flex justify-center bg-gray-200 lg:h-[10vh]"
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
    </div>
  );
});

export default LiveChat;
