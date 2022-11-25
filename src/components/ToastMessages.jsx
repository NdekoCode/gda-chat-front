import { toast } from "react-toastify";

const ToastMessages = ({ type, message }) => {
  if (type === "success") {
    return toast.success(message);
  } else if (type === "danger") {
    return toast.error(message);
  } else if (type === "warning") {
    return toast.warn(message);
  }
  return toast.info(message);
};

export default ToastMessages;
