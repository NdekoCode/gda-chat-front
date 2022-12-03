import React, { memo } from "react";
import ChatContext from "../../data/AppContext";
import { arrayIsEmpty } from "../../data/utilsFuns";
import StickyNavbar from "../StickyNavbar";
import AddLoadUsers from "./AddLoadUsers";
import SearchFormInterface from "./SearchFormInterface";
import UserDataInterface from "./UserDataInterface";
import UserSkeleton from "./UserSkeleton";

const ChatUserInterface = memo(({ contactUsers, isLoading }) => {
  const { usersIsShown, activeBlock, showLoadUser } = ChatContext();
  return (
    <>
      <div
        className="relative fadeLeave flex flex-col h-full bg-white border-r border-gray-300 shadow-xl md:block transform w-full transition-all sm:w-[24rem] duration-500 ease-in-out"
        style={{ display: activeBlock && "none" }}
      >
        <div className="flex justify-between px-3 pt-1 text-white">
          <div className="flex items-center w-full py-2">
            <StickyNavbar />
            <SearchFormInterface />
          </div>
        </div>
        <div className="border-b shadow-bot">
          <ul className="flex flex-row items-center px-2 list-none select-none">
            <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
              <a className="flex items-center justify-center py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-blue-500">
                Messages
              </a>
            </li>
          </ul>
        </div>
        <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter  scrollbar-thumb-rounded scrollbar-thumb-gray">
          <ul className="flex flex-col inline-block w-full h-screen pb-32 px-2 select-none">
            {!arrayIsEmpty(contactUsers)
              ? contactUsers.map((user) => (
                  <UserDataInterface key={user._id} user={user} />
                ))
              : isLoading && <UserSkeleton />}
          </ul>
        </div>
        <div className="fixed bottom-0 right-0 z-40 mb-6 mr-4">
          <button
            onClick={showLoadUser}
            className="animate-bounce shadow-md flex items-center justify-center bg-blue-500 w-12 h-12 mr-3 text-xl font-semibold focus:outline-none text-white flex-no-shrink rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              className="ionicon w-6 h-6 fill-current"
              viewBox="0 0 512 512"
            >
              <title>Add</title>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M256 112v288M400 256H112"
              />
            </svg>
          </button>
        </div>
      </div>
      {usersIsShown && <AddLoadUsers showUsers={showLoadUser} />}
    </>
  );
});

export default ChatUserInterface;
