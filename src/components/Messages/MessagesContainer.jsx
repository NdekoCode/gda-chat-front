import moment from "moment";
import React, { useEffect, useRef } from "react";
import imageChat from "../../assets/img/WhatsappImage.png";
import { arrayIsEmpty } from "../../data/utilsFuns";
import DateMessage from "./DateMessage";
import FormMessage from "./FormMessage";
import Message from "./Message";

const MessagesContainer = ({ messages, userData }) => {
  const messageDiv = useRef(null);
  let lastDate = null;
  const messageComp = [];
  messages.forEach(({ _id, senderId, message, createdAt }, index) => {
    if (createdAt && createdAt.split("T")[0] !== lastDate) {
      lastDate = createdAt.split("T")[0];
      messageComp.push(
        <DateMessage
          date={`${moment(lastDate).fromNow()}, ${moment(lastDate).format(
            "MMMM d, YYYY"
          )}`}
          key={_id}
        />
      );
    }
    messageComp.push(
      <Message
        key={index}
        sender={senderId === userData.userId}
        date={createdAt}
        msg={message}
      />
    );
  });
  useEffect(() => {
    messageDiv.current?.scrollTo({
      behavior: "smooth",
      to: 0,
    });
  });
  return (
    <div
      className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-hidden bg-transparent bg-bottom bg-contain bg-chat center center overflow-scroll "
      style={{ backgroundImage: `url('${imageChat}')` }}
    >
      <div className="self-center flex-1 w-full">
        <div className="relative flex flex-col px-3 py-1 m-auto mb-24">
          <div className="self-center px-2 py-1 mx-0 my-1 text-sm  text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
            Channel was created
          </div>
          {!arrayIsEmpty(messages) && <>{messageComp}</>}
          {}
          {/* <Message sender={false} msg="Nice to meet you arick" /> */}
          {/* <Message sender={true} msg="HI my name is arick" /> */}
          <div className="hidden" id="bottom" ref={messageDiv}></div>
        </div>
      </div>
      <FormMessage />
    </div>
  );
};

export default MessagesContainer;
