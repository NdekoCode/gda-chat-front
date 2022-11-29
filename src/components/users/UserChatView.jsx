import React, { useState } from "react";
import ChatContext from "../../data/AppContext";
import { objectIsEmpty } from "../../data/utilsFuns";
import StickyButton from "../StickyButton";
import UserTyping from "./UserTyping";
const UserChatView = ({ user }) => {
  const { socket, selectedUser } = ChatContext();
  const [userTyping, setUserTyping] = useState({
    isTyping: false,
    userType: {},
  });

  socket.on("typing", (user) => {
    setUserTyping({ isTyping: true, userType: user });
  });
  return (
    !objectIsEmpty(user) && (
      <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
        <div
          className="w-12 h-12 mx-4 my-2 flex items-center justify-center font-extrabold bg-blue-500 bg-center text-white bg-no-repeat bg-cover rounded-full cursor-pointer"
          style={
            user.image
              ? {
                  backgroundImage: `url('${user.image}')`,
                }
              : {}
          }
        >
          {!user.image && user.username[0].toUpperCase()}
        </div>
        <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
          <div className="overflow-hidden text-base font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {`${user.firstName} ${user.lastName}`}
          </div>
          <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {userTyping.isTyping && userTyping.userId === user._id ? (
              <UserTyping user={userTyping.userType} />
            ) : (
              "Online"
            )}
          </div>
        </div>
        <div className="flex items-center">
          <StickyButton />
          <div className="self-center md:hidden focus:outline-none">
            <StickyButton responsive={false} />
          </div>
        </div>
      </div>
    )
  );
};

export default UserChatView;
