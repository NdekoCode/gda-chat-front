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
                <div
                  className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded-full text-gray-400 bg-gray-400 animate-pulse`}
                >
                  U
                </div>
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
