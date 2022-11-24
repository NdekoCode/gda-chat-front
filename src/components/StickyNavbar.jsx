import React, { useState } from "react";
import ChatContext from "../data/AppContext";
import { logOut } from "../services/AuthApi";

const StickyNavbar = () => {
  const { handleVisible, setUserIsAuthenticated } = ChatContext();
  const [state, setState] = useState({
    visible: false,
    classVisible: "",
  });

  const logOutUser = () => {
    setUserIsAuthenticated(false);
    logOut();
  };
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
        <span className="sr-only">Okay</span>
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=50"
          alt="user photo"
        />
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
            <div>Karen</div>
            <div className="font-medium truncate">Karen@gmail.com</div>
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
