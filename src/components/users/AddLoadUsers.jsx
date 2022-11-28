import React from "react";
import StickyNavbar from "../StickyNavbar";
import SearchFormInterface from "./SearchFormInterface";

const AddLoadUsers = () => {
  return (
    <div className="fixed bg-slate-800 min-h-screen inset-0 flex flex-col justify-center">
      <div
        className="relative flex flex-col hidden h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out"
        style={{ width: "24rem" }}
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
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter  scrollbar-thumb-rounded scrollbar-thumb-gray">
          <ul className="flex flex-col inline-block w-full h-screen pb-32 px-2 select-none">
            {!arrayIsEmpty(users)
              ? users.map((user) => (
                  <UserDataInterface key={user._id} user={user} />
                ))
              : isLoading && <UserSkeleton />}

            <li
              className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200"
              style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
            >
              <div className="flex justify-between w-full focus:outline-none">
                <div className="flex justify-between w-full">
                  <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
                    <img
                      className="object-cover w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1589349133269-183a6c90fbfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100"
                      alt=""
                    />
                    <div
                      className="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full"
                      style={{ width: "0.80rem", height: "0.80rem" }}
                    >
                      <div
                        className="bg-green-500 rounded-full"
                        style={{ width: "0.6rem", height: "0.6rem" }}
                      />
                    </div>
                  </div>
                  <div className="items-center flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h2 className="text-sm font-semibold text-black">
                        Julian Gruber
                      </h2>
                      <div className="flex">
                        <svg
                          className="w-4 h-4 text-green-500 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width={19}
                          height={14}
                          viewBox="0 0 19 14"
                        >
                          <path
                            fillRule="nonzero"
                            d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z"
                          />
                        </svg>
                        <svg
                          className="w-4 h-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          width={19}
                          height={14}
                          viewBox="0 0 19 14"
                          style={{ color: "transparent" }}
                        >
                          <path
                            fillRule="nonzero"
                            d="M7.96833846,10.0490996 L14.5108251,2.571972 C14.7472185,2.30180819 15.1578642,2.27443181 15.428028,2.51082515 C15.6711754,2.72357915 15.717665,3.07747757 15.5522007,3.34307913 L15.4891749,3.428028 L8.48917485,11.428028 C8.2663359,11.6827011 7.89144111,11.7199091 7.62486888,11.5309823 L7.54038059,11.4596194 L4.54038059,8.45961941 C4.2865398,8.20577862 4.2865398,7.79422138 4.54038059,7.54038059 C4.7688373,7.31192388 5.12504434,7.28907821 5.37905111,7.47184358 L5.45961941,7.54038059 L7.96833846,10.0490996 L14.5108251,2.571972 L7.96833846,10.0490996 Z"
                          />
                        </svg>
                        <span className="ml-1 text-xs font-medium text-gray-600">
                          20.25
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm leading-none truncate">
                      <span>Send audio...</span>
                      <span
                        v-else=""
                        className="flex items-center justify-center w-5 h-5 text-xs text-right text-white bg-green-500 rounded-full"
                      >
                        2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200"
              style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }}
            >
              <div className="flex justify-between w-full focus:outline-none">
                <div className="flex justify-between w-full">
                  <div className="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
                    <img
                      className="object-cover w-12 h-12 rounded-full"
                      src="https://images.unsplash.com/photo-1589222331438-0511a448dbc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100"
                      alt=""
                    />
                  </div>
                  <div className="items-center flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <h2 className="text-sm font-semibold text-black">
                        Karlien Nihen
                      </h2>
                      <div className="flex">
                        <span className="ml-1 text-xs font-medium text-gray-600">
                          2.28
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm leading-none truncate">
                      <span>Writing...</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="fixed top-0 left-0 z-40 mt-6 ml-4">
          <button className="animate-ping shadow-md flex items-center justify-center bg-red-500 w-12 h-12 mr-3 text-xl font-semibold focus:outline-none text-white flex-no-shrink rounded-lg">
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
