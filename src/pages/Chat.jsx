import React, { useEffect, useState } from "react";
import ChatContainer from "../components/Messages/ChatContainer";
import ChatSidebar from "../components/users/ChatSidebar";
import ChatUserInterface from "../components/users/ChatUserInterface";
import NoSelectedUserMessage from "../components/users/NoSelectedUserMessage";
import ChatContext from "../data/AppContext";
import { arrayIsEmpty } from "../data/utilsFuns";
import { loadData } from "../services/Utils";

const Chat = () => {
  const {
    selectedUser,
    contactUsers,
    usersIsShown,
    setContactUsers,
    setMessages,
  } = ChatContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const contactsData = await loadData(
        setContactUsers,
        setLoading,
        "/auth/users/contacts"
      );
      if (contactsData.alert) {
        const { alert } = contactsData;
        alert.statusCode < 400
          ? toast.info(alert.message)
          : toast.error(alert.message);
      }

      const dataMessages = await loadData(setMessages, setLoading, "/messages");
      if (dataMessages.alert) {
        const { alert } = dataMessages;
        alert.statusCode < 400
          ? toast.info(alert.message)
          : toast.error(alert.message);
      }
    })();
    (async () => {})();
  }, []);

  return (
    <section
      className="h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#edf2f7" }}
    >
      <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
        {/* left */}
        <ChatUserInterface isLoading={isLoading} contactUsers={contactUsers} />
        {/* center */}

        {!arrayIsEmpty(selectedUser.user) && !usersIsShown ? (
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
