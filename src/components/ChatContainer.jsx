import React from "react";
import ChatContext from "../data/AppContext";
import MessagesContainer from "./MessagesContainer";
import UserChatView from "./UserChatView";

const ChatContainer = () => {
  const { selectedUser } = ChatContext();
  return (
    <div className="relative flex flex-col flex-1">
      <UserChatView />
      <MessagesContainer />
    </div>
  );
};

export default ChatContainer;
