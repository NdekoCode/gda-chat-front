import React, { useEffect, useState } from "react";
import ChatContext from "../../data/AppContext";
import {
  arrayIsEmpty,
  findAndSetData,
  getDataStorage,
  setDataStorage,
} from "../../data/utilsFuns";
import StickyNavbar from "../StickyNavbar";
import UserSkeleton from "../UserSkeleton";
import SearchFormInterface from "./SearchFormInterface";
import UserDataInterface from "./UserDataInterface";

const AddLoadUsers = ({ showUsers }) => {
  const { settings, selectedUser } = ChatContext();
  const storageUser = getDataStorage("users");
  const [users, setUsers] = useState(storageUser ? storageUser : []);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (arrayIsEmpty(users)) {
        const [data, loading] = await findAndSetData(
          settings.main_url + "/auth/users",
          setUsers
        );
        setIsLoading(loading);
        setDataStorage("users", data);
      } else {
        setIsLoading(false);
      }
    })();
  }, [isLoading, setUsers]);
  return (
    <div className="fixed bg-slate-900/60 min-h-screen fadeIn inset-0 flex flex-col justify-center">
      <div className="relative flex flex-col h-full bg-white border-r border-gray-300 shadow-xl md:block transform w-full transition-all sm:w-[24rem] duration-500 ease-in-out">
        <div className="flex justify-between px-3 pt-1 text-white">
          <div className="flex items-center w-full py-2">
            <StickyNavbar />
            <SearchFormInterface users={users} setUsers={setUsers} />
          </div>
        </div>
        <div className="border-b shadow-bot"></div>
        <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter  scrollbar-thumb-rounded scrollbar-thumb-gray">
          <ul className="flex flex-col inline-block w-full h-screen pb-32 px-2 select-none">
            {!arrayIsEmpty(users)
              ? users.map((user) => (
                  <>
                    <UserDataInterface
                      key={user._id}
                      user={user}
                      showUsers={showUsers}
                    />
                    <div className="border-b shadow-bot"></div>
                  </>
                ))
              : isLoading && <UserSkeleton />}
          </ul>
        </div>
        <div
          className="fixed -top-3 left-3 mr-4 sm:-right-20 sm:left-auto z-50 mt-6 sm:ml-4 sm:mr-0"
          title="Close"
        >
          <button
            onClick={showUsers}
            className="animate-bounce sm:animate-pulse hover:animate-none shadow-md flex items-center justify-center bg-red-500 w-12 h-12 mr-3 text-xl font-semibold focus:outline-none text-white flex-no-shrink rounded-lg transition-all shodow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              className="ionicon w-6 h-6 fill-current"
              viewBox="0 0 512 512"
            >
              <title>Close</title>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={32}
                d="M368 368L144 144M368 144L144 368"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLoadUsers;
