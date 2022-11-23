import React from "react";

const AlertSuccess = ({ type = "Success", message, animateClass = "" }) => {
  return (
    <div className="fixed right-2 w-full top-2 p-3 z-10 flex flex-col space-y-4 items-center justify-center bg-gray-100 py-6">
      {/* Success */}
      <div
        className={
          "alert flex flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300 " +
          animateClass
        }
      >
        <div className="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
          <span className="text-green-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title font-semibold text-lg text-green-800">
            {type}
          </div>
          <div className="alert-description text-sm text-green-600">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSuccess;
