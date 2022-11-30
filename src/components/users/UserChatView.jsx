import React, { useState } from "react";
import ChatContext from "../../data/AppContext";
import { objectIsEmpty } from "../../data/utilsFuns";
import StickyButton from "../StickyButton";
import UserTyping from "./UserTyping";
const UserChatView = ({ user }) => {
  const { socket, showComponentResponsive, activeToggleBlock } = ChatContext();
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
        {showComponentResponsive && (
          <button className="ml-3 cursoir-pointer" onClick={activeToggleBlock}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon fill-current h-6 w-6 text-gray-600"
              viewBox="0 0 512 512"
            >
              <title>Arrow Back</title>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={48}
                d="M244 400L100 256l144-144M120 256h292"
              />
            </svg>
          </button>
        )}
        <div
          className="w-12 h-12 mx-2 my-2 flex items-center justify-center font-extrabold bg-blue-500 bg-center text-white bg-no-repeat bg-cover rounded-full cursor-pointer"
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
