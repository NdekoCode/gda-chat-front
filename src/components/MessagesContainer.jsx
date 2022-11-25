import React from "react";
import imageChat from "../assets/img/WhatsappImage.png";
import ChatContext from "../data/AppContext";
import DateMessage from "./DateMessage";
import FormMessage from "./FormMessage";
import Message from "./Message";

const MessagesContainer = () => {
  const { userData, chatUser } = ChatContext();
  return (
    <div
      className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-contain bg-chat center center "
      style={{ backgroundImage: `url('${imageChat}')` }}
    >
      <div className="self-center flex-1 w-full">
        <div className="relative flex flex-col px-3 py-1 m-auto">
          <div className="self-center px-2 py-1 mx-0 my-1 text-sm  text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
            Channel was created
          </div>
          <DateMessage date=" May 6" />
          {chatUser.map(({ sent_by, message, _id }) => (
            <Message
              key={_id}
              sender={sent_by === userData._id}
              msg={message}
            />
          ))}
          {/* <Message sender={false} msg="Nice to meet you arick" /> */}
          {/* <Message sender={true} msg="HI my name is arick" /> */}
        </div>
      </div>
      <FormMessage />
    </div>
  );
};

export default MessagesContainer;
