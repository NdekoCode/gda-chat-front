import moment from "moment/moment";
import React, { memo, useState } from "react";
import ChatContext from "../../data/AppContext";
import { addNewContact } from "../../data/utilsFuns";

const UserLoadInterface = memo(({ user, showUsers = null, child }) => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    setContactUsers,
    userData,
    socket,
    activeToggleBlock,
    showComponentResponsive,
    addInterlocutorId,
  } = ChatContext();

  const { firstName, lastName, image, username, _id } = user;
  const fullName = `${firstName} ${lastName}`;
  const userChat = messages.filter(
    (ms) =>
      (ms.senderId === userData.userId && ms.receiverId === user._id) ||
      (ms.senderId === user._id && ms.receiverId === userData.userId)
  );
  // Les ETATS
  const [userConnected, setUserConnected] = useState(false);
  // LES EVENEMENTS SOCKETS
  socket.on("contact_online", (userAuth) => {
    if (userAuth.email === user.email && userAuth.email !== userData.email) {
      setUserConnected(true);
    }
  });

  const handleClick = () => {
    addInterlocutorId(user._id);
    if (showUsers !== null) {
      showUsers(false);
    }
    if (showComponentResponsive) {
      activeToggleBlock();
    }
    addNewContact(user, setContactUsers);
    setSelectedUser((d) => ({
      ...d,
      userId: user._id,
      user: user,
      messages: userChat,
    }));
  };

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
              </div>
              <div className="flex justify-between text-sm leading-none truncate">
                <span className="text-gray-500 text-xs font-light mt-1">
                  online there: {moment(user.lastConnection).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </button>
      </li>
      {child}
    </>
  );
});

export default UserLoadInterface;
