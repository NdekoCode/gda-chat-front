import React, { memo } from "react";
import ChatContext from "../../data/AppContext";
import UserChatView from "../users/UserChatView";
import MessagesContainer from "./MessagesContainer";

const ChatContainer = memo(() => {
  const {
    userData,
    selectedUser,
    setSelectedUser,
    socket,
    activeBlock,
    setMessages,
    setLoading,
  } = ChatContext();

  const { messages } = selectedUser;
  return (
    <div
      className="hidden fade sm:flex flex-col flex-1 relative"
      style={{ display: activeBlock && "flex" }}
    >
      <UserChatView user={selectedUser.user} />
      <MessagesContainer messages={messages} userData={userData} />
    </div>
  );
});

export default ChatContainer;
