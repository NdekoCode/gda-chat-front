import React, { useState } from "react";
import { toast } from "react-toastify";
import ChatContext from "../../data/AppContext";

const FormMessage = () => {
  const { settings, setLoading, selectedUser, userData, setChatUser, socket } =
    ChatContext();
  console.log(selectedUser);
  const [msg, setMsg] = useState();
  const handleMessage = (evt) => {
    const value = evt.target.value;
    setMsg(value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();

    setMsg("");
    (async () => {
      const dataSend = {
        userIdA: userData.userId,
        userIdB: selectedUser._id,
        message: msg,
        send_by: userData.userId,
      };

      let loading = true;
      const response = await fetch(
        settings.main_url + "/chat/send/" + selectedUser._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: settings.token,
          },
          body: JSON.stringify(dataSend),
        }
      );
      const responseData = await response.json();
      socket.emit("send_message", dataSend);
      if (response.ok) {
        loading = false;
        toast.success(responseData.alert.message);
        setChatUser((d) => [...d, dataSend]);
        console.log(responseData);
      } else {
        toast.error(responseData.alert.message);
        loading = false;
      }
      setLoading(loading);
      console.log(responseData);
    })();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
      method="POST"
    >
      <div className="w-full flex items">
        <span className="absolute inset-y-0 left-0 flex items-center pl-6">
          <label
            htmlFor="file"
            className="p-1 focus:outline-none focus:shadow-none cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </label>

          <input id="file" type="file" className="hidden" />
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-6">
          <button
            type="submit"
            className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fillRule="nonzero"
                d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z"
              />
            </svg>
          </button>
        </span>
        <textarea
          rows={1.2}
          type="text"
          className="w-full flex items-center  scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 py-2 pl-10 text-sm bg-white border border-transparent appearance-none  placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue resize-none"
          style={{ borderRadius: 25 }}
          value={msg}
          name="message"
          onChange={handleMessage}
          placeholder="Message..."
          autoComplete="off"
        ></textarea>
      </div>
    </form>
  );
};

export default FormMessage;
