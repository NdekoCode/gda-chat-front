import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import IO from "socket.io-client";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import RedirectAuthenticated from "./components/auth/RedirectAuthenticated";
import ToastMessages from "./components/ToastMessages";
import ChatContext from "./data/AppContext";
import {
  arrayIsEmpty,
  BASE_URL,
  removeItem,
  setDataStorage,
} from "./data/utilsFuns";
import routes from "./routes/routes";
import { verifyUserHasAuthenticated } from "./services/AuthApi";
const socket = IO.connect(BASE_URL);
function App() {
  const [isSocketConnect, setIsSocketConnect] = useState(socket.connected);
  const [lastConnect, setLastConnect] = useState(null);

  const {
    userData,
    alert,
    setSocket,
    setAlert,
    setUserIsAuthenticated,
    userIsAuthenticated,
    updateDimensions,
  } = ChatContext();
  useEffect(() => {
    updateDimensions();
    // On verifie si l'utilisateur est
    setUserIsAuthenticated(verifyUserHasAuthenticated());
    if (!arrayIsEmpty(alert)) {
      ToastMessages(alert);
      setAlert([]);
    }
    setSocket(socket);

    if (userIsAuthenticated) {
      removeItem("users");
      setDataStorage("contacts", []);
      socket.on("connect", () => {
        setIsSocketConnect(true);
        if (userIsAuthenticated) {
          // Si je suis connecter au tout debut je vais rejoindre mon propre salon
          socket.emit("join_conversation", {
            userConnectId: userData.userId,
            userInterlocutorId: userData.userId,
          });
          socket.emit("user_online", userData);
        }
      });
      socket.on("disconnect", () => {
        setIsSocketConnect(false);
      });

      socket.on("user_login", (user) => {
        if (user.email !== userData.email) {
          toast.info(user.firstName + " est connecté");
        }
      });
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("user_login");
      socket.off("send_message");
      socket.off("user_contact");
      socket.off("user_writing");
    };
  }, [setUserIsAuthenticated, userIsAuthenticated]);

  return (
    <>
      <Routes>
        {routes.map(({ path, protect, component }, index) => {
          if (protect) {
            return (
              <Route
                key={index}
                path={path}
                element={<AuthenticatedRoutes>{component}</AuthenticatedRoutes>}
              ></Route>
            );
          }
          return (
            <Route
              path={path}
              key={index}
              element={
                <RedirectAuthenticated>{component}</RedirectAuthenticated>
              }
            ></Route>
          );
        })}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
