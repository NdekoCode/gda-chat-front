import React, { useState } from "react";
import { toast } from "react-toastify";
import ChatContext from "../data/AppContext";
import { logOut } from "../services/AuthApi";

const StickyButton = ({ responsive = true }) => {
  const { handleVisible, userData, setUserIsAuthenticated } = ChatContext();
  const logOutUser = () => {
    toast.info("Vous etes deconnecter");
    setUserIsAuthenticated(false);
    logOut();
  };
  const [visible, setVisible] = useState(false);
  const handleStickyVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className="relative">
      <button
        onClick={handleStickyVisible}
        type="button"
        className={`flex self-center ${
          responsive && "hidden"
        } p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300`}
      >
        <svg
          className="w-6 h-6 text-gray-600 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fillRule="nonzero"
            d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      {visible && (
        <div
          id="dropdownAvatar"
          className={
            visible
              ? "fadeIn absolute bg-white bottom-100 right-0 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              : "fadeIn hidden " + " z-10 w-44 "
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
                className="w-full block text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
              className="w-full block text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyButton;
