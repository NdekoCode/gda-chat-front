import React, { useEffect, useState } from "react";
import AlertDanger from "./AlertDanger";
import AlertInfos from "./AlertInfo";
import AlertSuccess from "./AlertSuccess";
import AlertWarning from "./AlertWarning";

const Alerts = ({ type, message }) => {
  const [state, setVisible] = useState({
    visible: true,
    classVisible: "block active",
  });
  useEffect(() => {
    const timer = setTimeout(
      () =>
        setVisible((state) => ({
          ...state,
          visible: false,
          classVisible: "inactive hidden",
        })),
      3500
    );
    return () => {
      clearTimeout(timer);
    };
  });
  if (state.visible) {
    if (type === "success") {
      return (
        <AlertSuccess message={message} animateClass={state.classVisible} />
      );
    } else if (type === "danger") {
      return (
        <AlertDanger message={message} animateClass={state.classVisible} />
      );
    }
    if (type === "infos") {
      return <AlertInfos message={message} animateClass={state.classVisible} />;
    }
    return <AlertWarning message={message} animateClass={state.classVisible} />;
  }
};

export default Alerts;
