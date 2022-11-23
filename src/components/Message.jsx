import React from "react";

const Message = ({ sender, msg }) => {
  return (
    <div className={`w-3/4 my-2 ${sender ? "self-end" : "self-start"}`}>
      <div
        className={`p-4 text-sm  ${
          sender
            ? "bg-blue-500 text-white rounded-t-lg rounded-l-lg"
            : "bg-white rounded-t-lg rounded-r-lg"
        } shadow"`}
      >
        {msg}
      </div>
    </div>
  );
};

export default Message;
