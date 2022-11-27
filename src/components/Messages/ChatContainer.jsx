import React from "react";
import ChatContext from "../../data/AppContext";
import UserChatView from "../users/UserChatView";
import MessagesContainer from "./MessagesContainer";

const ChatContainer = () => {
  const { userData, selectedUser, setSelectedUser, setActiveChatId, socket } =
    ChatContext();
  console.log(selectedUser.messages);
  const { messages } = selectedUser;

  socket.on("received_message", (dataReceive) => {
    setActiveChatId(dataReceive.receiver);
    console.log("Message received", dataReceive);
    const msg = selectedUser.messages.filter(
      (d) =>
        d.sender !== dataReceive.sender ||
        d.message !== dataReceive.message ||
        d.createdAt !== dataReceive.createdAt
    );
    msg.push(dataReceive);
    setSelectedUser((d) => ({ ...d, messages: msg }));
  });
  return (
    <div className="relative flex flex-col flex-1">
      <UserChatView user={selectedUser.user} />
      <MessagesContainer messages={messages} userData={userData} />
    </div>
  );
};

export default ChatContainer;
