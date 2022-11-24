import React, { useState } from "react";

const StickyNavbar = () => {
  const [state, setState] = useState({
    visible: false,
    classVisible: "",
  });
  const handleVisible = () => {
    setState((d) => ({ ...d, visible: !state.visible }));
  };
  return (
    <div className="relative">
      <button
        onClick={handleVisible}
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
      >
        <span className="sr-only">Okay</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
      </button>
      {/* Dropdown menu */}
      {state.visible && (
        <div
          id="dropdownAvatar"
          className={
            state.visible
              ? "absolute "
              : "hidden " +
                " z-10 w-44 bg-white  bottom-0 right-0 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          }
        >
          <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
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
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              LogOut
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNavbar;
