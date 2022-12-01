import React, { useState } from "react";
import ChatContext from "../data/AppContext";

const StickyNavbar = () => {
  const { handleVisible, userData, logOutUser } = ChatContext();
  const [state, setState] = useState({
    visible: false,
    classVisible: "",
  });

  const handleStickyVisible = () => {
    setState((d) => ({ ...d, visible: !state.visible }));
  };
  return (
    <div className="relative">
      <button
        onClick={handleStickyVisible}
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex items-center justify-center mx-3 w-10 h-10 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span className="sr-only">{userData.username}</span>
        {userData.image ? (
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={userData.image}
            alt="user photo"
          />
        ) : (
          <div className="w-8 h-8 rounded-full text-white font-bold text-xl pt-0.5">
            {userData.username[0].toUpperCase()}
          </div>
        )}
      </button>
      {/* Dropdown menu */}
      {state.visible && (
        <div
          id="dropdownAvatar"
          style={{ zIndex: 1000 }}
          className={
            state.visible
              ? "fadeIn text-center absolute bg-white bottom-100 left-0 rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600"
              : "fadeIn hidden " + " z-50 w-44 "
          }
        >
          <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
            <div>{userData.username}</div>
            <div className="font-medium truncate">{userData.email}</div>
          </div>
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <button
                onClick={handleVisible}
                className="w-full block text-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </button>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <button
              onClick={logOutUser}
              className="w-full block text-center py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNavbar;
