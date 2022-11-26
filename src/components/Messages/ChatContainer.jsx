import React from "react";
import UserChatView from "../users/UserChatView";
import MessagesContainer from "./MessagesContainer";

const ChatContainer = () => {
  return (
    <div className="relative flex flex-col flex-1">
      <UserChatView />
      <MessagesContainer />
    </div>
  );
};

export default ChatContainer;
