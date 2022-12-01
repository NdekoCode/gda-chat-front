import React, { memo, useEffect, useState } from "react";
import ChatContext from "../../data/AppContext";
import { formatTime, objectIsEmpty, toStr } from "../../data/utilsFuns";
import UserTyping from "./UserTyping";

const UserDataInterface = memo(({ user, showUsers = null, child }) => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    userData,
    socket,
    contactUsers,
    addNewContact,
    activeToggleBlock,
    showComponentResponsive,
  } = ChatContext();

  const { firstName, lastName, image, username, _id } = user;
  const fullName = `${firstName} ${lastName}`;

  // Recupère moi tous les messages que l'utilisateur sur lequel m'as déjà envoyer ou que je lui est déja envoyer m'a déjà envoyer
  const userChat = messages.filter(
    (ms) =>
      (ms.senderId === userData.userId && ms.receiverId === user._id) ||
      (ms.senderId === user._id && ms.receiverId === userData.userId)
  );
  console.log(userChat);
  const chatMessages = messages.filter(
    (msg) =>
      toStr(msg.talkersIds) === toStr([_id, userData.userId]) ||
      toStr([userData.userId, _id]) === toStr(msg.talkersIds)
  );
  // Les ETATS
  const [lastMessage, setLastMessage] = useState(
    userChat[userChat.length - 1] ? userChat[userChat.length - 1] : {}
  );
  const [userConnected, setUserConnected] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const [userTyping, setUserTyping] = useState({
    userId: null,
    isTyping: false,
    userType: {},
  });

  // LES FONCTIONS
  const addLastMessage = (msg) => {
    console.log(msg, user._id);
    if (msg) {
      const userTest = user._id === msg.receiverId || user._id === msg.senderId;
      if (userTest) {
        setLastMessage(msg);
      }
    }
  };
  console.log(chatMessages);
  // LES EVENEMENTS SOCKETS
  socket.on("new_user", (userAuth) => {
    if (userAuth.email === user.email && userAuth.email !== userData.email) {
      setUserConnected(true);
    }
  });
  socket.on("typing", (userType) => {
    setUserTyping((state) => ({
      ...state,
      userId: userType.isWriting.userId,
      isTyping: true,
      userType: userType.isWriting,
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
    if (
      dataReceived.dataSend.receiverId === userData.userId &&
      dataReceived.dataSend.senderId === user._id
    ) {
      setNewMessage(true);
      addLastMessage(dataReceived.dataSend);
    }
  });
  const handleClick = () => {
    const userExist = contactUsers.some((userF) => userF._id === user._id);
    setNewMessage(false);
    console.log(userChat, userData.userId, user._id);
    if (showComponentResponsive) {
      activeToggleBlock();
    }

    if (showUsers !== null) {
      showUsers(false);
    }
    if (!userExist) {
      console.log("User don't exists in my contact", user);
      addNewContact(user);
    }
    setSelectedUser((d) => ({ ...d, user: user, messages: userChat }));

    /*   socket.emit("join_user", {
      userConnectId: userData.userId,
      userInterlocutorId: user._id,
      userInterlocutor: user,
    });

    socket.on("load_messages", (messagesChat) => {
      const chatMessages = JSON.parse(messagesChat);
      if (!arrayIsEmpty(chatMessages)) {
        addLastMessage(chatMessages[chatMessages.length - 1]);
      }
    }); */
  };

  useEffect(() => {
    addLastMessage(userChat[userChat.length - 1]);
  }, [lastMessage]);
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
                  <svg
                    className="w-4 h-4 text-green-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={19}
                    height={14}
                    viewBox="0 0 19 14"
                  >
                    <path
                      fillRule="nonzero"
                      d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"
                    />
                  </svg>
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width={19}
                    height={14}
                    viewBox="0 0 19 14"
                    style={{ color: "transparent" }}
                  >
                    <path
                      fillRule="nonzero"
                      d="M7.96833846,10.0490996 L14.5108251,2.571972 C14.7472185,2.30180819 15.1578642,2.27443181 15.428028,2.51082515 C15.6711754,2.72357915 15.717665,3.07747757 15.5522007,3.34307913 L15.4891749,3.428028 L8.48917485,11.428028 C8.2663359,11.6827011 7.89144111,11.7199091 7.62486888,11.5309823 L7.54038059,11.4596194 L4.54038059,8.45961941 C4.2865398,8.20577862 4.2865398,7.79422138 4.54038059,7.54038059 C4.7688373,7.31192388 5.12504434,7.28907821 5.37905111,7.47184358 L5.45961941,7.54038059 L7.96833846,10.0490996 L14.5108251,2.571972 L7.96833846,10.0490996 Z"
                    />
                  </svg>
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
                {JSON.stringify(newMessage)}
                {newMessage && (
                  <span
                    v-else=""
                    className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full"
                  >
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
});

export default UserDataInterface;
