import React, { useEffect, useState } from "react";
import ChatContainer from "../components/Messages/ChatContainer";
import ChatSidebar from "../components/users/ChatSidebar";
import ChatUserInterface from "../components/users/ChatUserInterface";
import NoSelectedUserMessage from "../components/users/NoSelectedUserMessage";
import ChatContext from "../data/AppContext";
import { arrayIsEmpty, findAndSetData } from "../data/utilsFuns";

const Chat = () => {
  const {
    selectedUser,
    setSelectedUser,
    contactUsers,
    setContactUsers,
    addNewContact,
    settings,
    socket,
  } = ChatContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("user_contact", (userInterloc) => {
      console.log("Join a bum", userInterloc);
      const userExist = contactUsers.some(
        (userF) => userF._id === userInterloc._id
      );
      if (!userExist) {
        addNewContact(userInterloc);
        setSelectedUser((d) => ({ ...d, messages: [] }));
      }
    });
    setLoading(true);
    (async () => {
      const loading = await findAndSetData(
        settings.main_url + "/auth/contacts",
        setContactUsers
      )[1];
      setLoading(loading);
    })();
  }, [isLoading]);

  socket.on("load_messages", (messagesChat) => {
    const userMessages = JSON.parse(messagesChat);
    if (!arrayIsEmpty(userMessages)) {
      setSelectedUser((d) => ({ ...d, messages: userMessages }));
    }
  });

  socket.on("received_message", (dataReceived) => {
    const dontExist = !contactUsers.some(
      (userF) => userF._id === dataReceived.dataSend.sender
    );
    if (dontExist) {
      console.log("User don't exists in my contact", dataReceived.userSender);
      addNewContact(dataReceived.userSender);
    } else {
      setSelectedUser((d) => ({
        ...d,
        messages: [...selectedUser.messages, dataReceived.dataSend],
      }));
    }
  });
  return (
    <section
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* left */}
        <ChatUserInterface isLoading={isLoading} contactUsers={contactUsers} />
        {/* center */}

        {!arrayIsEmpty(selectedUser.user) ? (
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
