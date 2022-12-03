import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ChatContainer from "../components/Messages/ChatContainer";
import ChatSidebar from "../components/users/ChatSidebar";
import ChatUserInterface from "../components/users/ChatUserInterface";
import NoSelectedUserMessage from "../components/users/NoSelectedUserMessage";
import ChatContext from "../data/AppContext";
import {
  addNewContact,
  arrayIsEmpty,
  getDataStorage,
  isVarEmpty,
  setDataStorage,
} from "../data/utilsFuns";
import { loadData } from "../services/Utils";

const Chat = () => {
  const {
    selectedUser,
    setSelectedUser,
    usersIsShown,
    setContactUsers,
    socket,
    idUser,
    contactUsers,
    setMessages,
    addInterlocutorId,
    userData,
    messages,
  } = ChatContext();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const contactsData = await loadData(
        setContactUsers,
        setLoading,
        "/auth/users/contacts"
      );
      if (!arrayIsEmpty(contactsData)) {
        setDataStorage("contacts", contactsData);
      }
      if (contactsData.alert) {
        const { alert } = contactsData;
        if (alert.statusCode >= 400) {
          toast.error(alert.message);
          return toast.error(alert.message);
        }
      }

      const dataMessages = await loadData(setMessages, setLoading, "/messages");
      if (dataMessages.alert) {
        const { alert } = dataMessages;
        alert.statusCode < 400
          ? toast.info(alert.message)
          : toast.error(alert.message);
      }
    })();
    socket.on("received_message", (dataReceived) => {
      const { userSender, dataSend } = dataReceived;
      const currentId = getDataStorage("interlocId");
      loadData(setMessages, setLoading, "/messages")
        .then((messages) => {
          const userChat = [
            ...new Set(messages.map((ms) => JSON.stringify(ms))),
          ].map((ms) => JSON.parse(ms));
          /* const userChat = messages.filter(
            (ms) =>
              (ms.senderId === userSender._id &&
                ms.receiverId === userData.userId) ||
              (ms.senderId === userData.userId &&
                ms.receiverId === userSender._id)
          ); */
          console.log(messages, userChat);
          setSelectedUser((d) => ({
            ...d,
            messages: [
              ...new Set(userChat.map((ms) => JSON.stringify(ms))),
            ].map((ms) => JSON.parse(ms)),
          }));
        })
        .catch((error) => {
          toast.error(error.message);
        });
      if (currentId !== userSender._id) {
        addInterlocutorId(userSender._id);
      }

      addNewContact(userSender, setContactUsers);
    });
  }, [setMessages, setContactUsers, isLoading]);

  const { user, userId } = selectedUser;
  return (
    <section
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* left */}
        <ChatUserInterface isLoading={isLoading} contactUsers={contactUsers} />
        {/* center */}

        {!isVarEmpty(userId) && userId === idUser && !usersIsShown ? (
          <ChatContainer messages={selectedUser.messages} user={user} />
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
