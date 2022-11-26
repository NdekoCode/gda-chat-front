import { toast } from "react-toastify";

const ToastMessages = (alert) => {
  if (alert.type && alert.message) {
    if (alert.type === "success") {
      return toast.success(alert.message);
    } else if (alert.type === "danger") {
      return toast.error(alert.message);
    } else if (alert.type === "warning") {
      return toast.warn(alert.message);
    }
    return toast.info(alert.message);
  }
};

export default ToastMessages;
