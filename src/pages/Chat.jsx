import React from "react";
import ChatContainer from "../components/ChatContainer";
import ChatSidebar from "../components/ChatSidebar";
import ChatUserInterface from "../components/ChatUserInterface";

const Chat = () => {
  return (
    <section
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* left */}
        <ChatUserInterface />
        {/* center */}
        <ChatContainer />
        {/* right */}
        <ChatSidebar />
      </div>
    </section>
  );
};

export default Chat;
