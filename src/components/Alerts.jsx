import React from "react";
import AlertDanger from "./AlertDanger";
import AlertInfos from "./AlertInfo";
import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

const Alerts = ({ type, message }) => {
  if (type === "success") {
    return <AlertSuccess message={message} />;
  } else if (type === "danger") {
    return <AlertDanger message={message} />;
  }
  if (type === "infos") {
    return <AlertInfos message={message} />;
  }
  return <AlertWarning message={message} />;
};

export default Alerts;
