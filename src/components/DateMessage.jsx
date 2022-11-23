import React from "react";

const DateMessage = (date = " May 6") => {
  return (
    <div className="self-center px-2 py-1 mx-0 my-1 text-sm  text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
      {date}
    </div>
  );
};

export default DateMessage;
