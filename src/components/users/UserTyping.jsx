import React from "react";

const UserTyping = ({ user, isTyping }) => {
  return (
    <>
      {isTyping && (
        <span className="text-blue-400 font-medium text-xs">
          {`${user.username[0].toUpperCase()}${user.username.substring(
            1,
            user.length
          )}`}{" "}
          est entrer d'ecrire ...
        </span>
      )}
    </>
  );
};

export default UserTyping;
