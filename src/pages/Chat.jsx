import React from "react";
import ChatContainer from "../components/Messages/ChatContainer";
import ChatSidebar from "../components/users/ChatSidebar";
import ChatUserInterface from "../components/users/ChatUserInterface";
import NoSelectedUserMessage from "../components/users/NoSelectedUserMessage";
import ChatContext from "../data/AppContext";
import { objectIsEmpty } from "../data/utilsFuns";

const Chat = () => {
  const { selectedUser } = ChatContext();
  return (
    <section
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* left */}
        <ChatUserInterface />
        {/* center */}

        {!objectIsEmpty(selectedUser) ? (
          <ChatContainer />
        ) : (
          <NoSelectedUserMessage />
        )}
        {/* right */}
        <ChatSidebar />
      </div>
    </section>
  );
};

export default Chat;
