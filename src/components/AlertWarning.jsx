import React from "react";

const AlertWarning = ({
  type = "Warning",
  message = "",
  animateClass = "",
}) => {
  return (
    <div className="fixed right-2 w-full top-2 p-3 z-10 flex flex-col space-y-4 items-center justify-center bg-gray-100 py-6">
      {/* WARGING */}
      <div
        className={
          "alert flex flex-row items-center bg-yellow-200 p-5 rounded border-b-2 border-yellow-300 " +
          animateClass
        }
      >
        <div className="alert-icon flex items-center bg-yellow-100 border-2 border-yellow-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
          <span className="text-yellow-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title font-semibold text-lg text-yellow-800">
            {type}
          </div>
          <div className="alert-description text-sm text-yellow-600">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertWarning;
