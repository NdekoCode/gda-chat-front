import moment from "moment";
import React from "react";

const Message = ({ sender, msg, date }) => {
  return (
    <div
      className={`w-3/4 my-2 max-w-max ${sender ? "self-end" : "self-start"}`}
    >
      <div
        className={`p-4 text-sm  ${
          sender
            ? "bg-blue-500 text-white rounded-t-lg rounded-l-lg"
            : "bg-white rounded-t-lg rounded-r-lg"
        } shadow"`}
      >
        {msg}
        <div className="flex justify-end">
          <div
            className={`text-xs -mb-3 mt-1 
              ${sender ? "text-gray-300" : "text-gray-400"}
              `}
          >
            {`${moment(date).fromNow()} | ${moment(date).format("H:m")}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
