import React from "react";
import MessagesContainer from "./MessagesContainer";
import UserChatView from "./UserChatView";

const ChatContainer = () => {
  return (
    <div className="relative flex flex-col flex-1">
      <UserChatView />
      <MessagesContainer />
    </div>
  );
};

export default ChatContainer;
