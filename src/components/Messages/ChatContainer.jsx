import React, { memo } from "react";
import ChatContext from "../../data/AppContext";
import UserChatView from "../users/UserChatView";
import MessagesContainer from "./MessagesContainer";

const ChatContainer = memo(() => {
  const { userData, selectedUser, setSelectedUser, socket, activeBlock } =
    ChatContext();

  const { messages } = selectedUser;

  socket.on("received_message", (dataReceive) => {
    console.log("New message detected ", dataReceive.dataSend);
    const msg = selectedUser.messages.filter(
      (d) =>
        d.receiver !== dataReceive.userSender.receiver ||
        d.message !== dataReceive.dataSend.message ||
        d.createdAt !== dataReceive.dataSend.createdAt
    );

    msg.push(dataReceive.dataSend);
    setSelectedUser((d) => ({
      ...d,
      messages: msg,
    }));
    // msg.push(dataReceive.dataSend);
    // setSelectedUser((d) => ({ ...d, messages: msg }));
  });
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
