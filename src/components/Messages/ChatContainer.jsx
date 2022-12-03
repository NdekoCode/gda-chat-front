import React, { memo } from "react";
import ChatContext from "../../data/AppContext";
import UserChatView from "../users/UserChatView";
import MessagesContainer from "./MessagesContainer";

const ChatContainer = memo(({ user, messages }) => {
  const { userData, activeBlock } = ChatContext();

  return (
    <div
      className="hidden fade sm:flex flex-col flex-1 relative"
      style={{ display: activeBlock && "flex" }}
    >
      <UserChatView user={user} />
      <MessagesContainer messages={messages} userData={userData} />
    </div>
  );
});

export default ChatContainer;
