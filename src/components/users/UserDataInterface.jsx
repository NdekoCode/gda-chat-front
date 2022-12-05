import React, { useEffect, useState } from "react";
import ChatContext from "../../data/AppContext";
import { arrayIsEmpty, formatTime, objectIsEmpty } from "../../data/utilsFuns";
import UserTyping from "./UserTyping";

const UserDataInterface = ({ user, showUsers = null, child }) => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    userData,
    socket,
    activeToggleBlock,
    showComponentResponsive,
    addInterlocutorId,
  } = ChatContext();

  const { firstName, lastName, image, username, _id } = user;
  const fullName = `${firstName} ${lastName}`;

  // Les ETATS
  const [lastMessage, setLastMessage] = useState({});
  const [userConnected, setUserConnected] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [messageLoad, setMessageLoad] = useState(true);
  const [newMessage, setNewMessage] = useState({
    state: false,
    senderId: null,
    receiverId: null,
  });

  const [userTyping, setUserTyping] = useState({
    userId: null,
    isTyping: false,
    userType: {},
  });

  // LES FONCTIONS
  const addLastMessage = (msg) => {
    if (msg) {
      const userTest =
        (user._id === msg.senderId && userData.userId === msg.receiverId) ||
        (user._id === msg.receiverId && userData.userId === msg.senderId);
      if (userTest) {
        setLastMessage(msg);
      }
    }
  };
  // LES EVENEMENTS SOCKETS
  socket.on("contact_online", (userAuth) => {
    if (userAuth.email === user.email) {
      setUserConnected(true);
    }
  });

  socket.on("typing", (userType) => {
    setUserTyping((state) => ({
      ...state,
      userId: userType.senderUser.userId,
      isTyping: true,
      userType: userType.senderUser,
    }));
    setTimeout(
      () =>
        setUserTyping((state) => ({
          ...state,
          isTyping: false,
        })),
      2500
    );
  });
  // On verifie si l'utilisateur qui nous envois le message
  socket.on("received_message", (dataReceived) => {
    addLastMessage(dataReceived.dataSend);
    if (
      dataReceived.dataSend.receiverId === userData.userId &&
      user._id === dataReceived.dataSend.senderId
    ) {
      setNewMessage({
        state: true,
        senderId: dataReceived.dataSend.senderId,
        receiverId: dataReceived.dataSend.receiverId,
      });
    }
  });
  const handleClick = () => {
    socket.emit("join_conversation", {
      userConnectId: userData.userId,
      userInterlocutorId: user._id,
      userInterlocutor: user,
    });
    addInterlocutorId(user._id);
    setNewMessage((d) => ({ ...d, state: false }));
    setSelectedUser((d) => ({
      ...d,
      userId: user._id,
      user: user,
      messages: [...userMessages],
    }));
    if (showComponentResponsive) {
      activeToggleBlock();
    }

    if (showUsers !== null) {
      showUsers(false);
    }
  };

  useEffect(() => {
    // Recupère moi tous les messages que l'utilisateur sur lequel m'as déjà envoyer ou que je lui est déja envoyer m'a déjà envoyer
    const userChat = messages.filter(
      (ms) =>
        (ms.senderId === userData.userId && ms.receiverId === _id) ||
        (ms.senderId === _id && ms.receiverId === userData.userId)
    );
    setUserMessages(userChat);
    if (!arrayIsEmpty(userMessages)) {
      setMessageLoad(false);
    } else {
      setMessageLoad(true);
    }
    addLastMessage(userMessages[userMessages.length - 1]);
  }, [messageLoad, messages, lastMessage]);
  return (
    <>
      <li
        className={`flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200 ${
          user._id === selectedUser.user._id && "bg-gray-200"
        }`}
      >
        <button
          onClick={handleClick}
          className="flex justify-between w-full focus:outline-none"
          style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
        >
          <div className="flex justify-between w-full">
            <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
              {image ? (
                <img
                  className="object-cover w-12 h-12 rounded-full overflow-hidden flex justify-center items-center"
                  src={image}
                  alt={username}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full text-whitebg-blue-800">
                  {username[0].toUpperCase()}
                </div>
              )}

              {userConnected && (
                <div
                  className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full"
                  style={{ width: "0.80rem", height: "0.80rem" }}
                >
                  <div
                    className="bg-green-500 rounded-full"
                    style={{ width: "0.6rem", height: "0.6rem" }}
                  />
                </div>
              )}
            </div>
            <div className="items-center flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <h2 className="text-sm font-semibold text-black">{fullName}</h2>
                <div className="flex">
                  <span className="ml-1 text-xs font-medium text-gray-600">
                    {!objectIsEmpty(lastMessage)
                      ? formatTime(lastMessage.createdAt)
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm leading-none truncate">
                <span className="text-gray-500">
                  {userTyping.isTyping && userTyping.userId === user._id ? (
                    <UserTyping
                      user={userTyping.userType}
                      isTyping={userTyping.isTyping}
                    />
                  ) : (
                    !objectIsEmpty(lastMessage) && lastMessage.message
                  )}{" "}
                </span>
                {newMessage.state &&
                  newMessage.senderId === user._id &&
                  newMessage.receiverId === userData.userId && (
                    <span className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full">
                      1
                    </span>
                  )}
              </div>
            </div>
          </div>
        </button>
      </li>
      {child}
    </>
  );
};

export default UserDataInterface;
