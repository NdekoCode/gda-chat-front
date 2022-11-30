import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import IO from "socket.io-client";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import RedirectAuthenticated from "./components/auth/RedirectAuthenticated";
import ToastMessages from "./components/ToastMessages";
import ChatContext from "./data/AppContext";
import { arrayIsEmpty, BASE_URL, removeItem } from "./data/utilsFuns";
import routes from "./routes/routes";
import { verifyUserHasAuthenticated } from "./services/AuthApi";
import { loadData } from "./services/Utils";
const socket = IO.connect(BASE_URL);
function App() {
  const [isSocketConnect, setIsSocketConnect] = useState(socket.connected);
  const [lastConnect, setLastConnect] = useState(null);

  const {
    setMessages,
    userData,
    alert,
    setSocket,
    setAlert,
    setLoading,
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
    console.log("Not connected", userIsAuthenticated);
    setSocket(socket);

    if (userIsAuthenticated) {
      removeItem("users");
      socket.on("connect", () => {
        setIsSocketConnect(true);
        /* socket.emit("join_user", {
        userConnectId: userData.userId,
        userInterlocutorId: null,
      }); */
      });
      socket.on("disconnect", () => {
        setIsSocketConnect(false);
      });

      /* socket.emit("user_connected", userData); */
      socket.on("user_login", (user) => {
        console.log(user.userId, userData.userId);
        if (user.userId !== userData.userId) {
          toast.info(user.firstName + " est connecté");
        }
      });
      (async () => {
        const dataMessages = await loadData(
          setMessages,
          setLoading,
          "/messages"
        );
        if (dataMessages.alert) {
          const { alert } = dataMessages;
          alert.statusCode < 400
            ? toast.info(alert.message)
            : toast.error(alert.message);
        }
      })();
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("user_connected");
      socket.off("new_user");
      socket.off("user_contact");
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
