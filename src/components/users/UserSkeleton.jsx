import React from "react";

const UserSkeleton = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {numbers.map((item) => (
        <button
          key={item}
          className="flex flex-no-wrap items-center pr-3 mb-3 text-black rounded-lg cursor-pointer mt-200 py-65 bg-gray-100 hover:bg-gray-200"
          style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
        >
          <div className="flex justify-between w-full focus:outline-none">
            <div className="flex justify-between items-center w-full">
              <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white rounded-full flex-no-shrink">
                <svg
                  className="block animate-pulse w-16 h-16 text-gray-400 dark:text-gray-700 animation-pulse"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="items-center flex-1 min-w-0 w-full h-8 bg-gray-400 animate-pulse rounded-3xl">
                <div className="flex justify-between mb-1"></div>
              </div>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default UserSkeleton;
