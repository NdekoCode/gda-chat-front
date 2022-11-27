// TODO: #11 - Fetch Users
// TODO: #10 - Register Users
// TODO: #9 - Login user
// TODO: #8 - Load message
// TODO: #7 - Load user message
// TODO: #6 - Uplaod user image
// TODO: #16  - User register
// TODO: #17  - User login
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IO from "socket.io-client";
import AuthenticatedRoutes from "./components/auth/AuthenticatedRoutes";
import RedirectAuthenticated from "./components/auth/RedirectAuthenticated";
import ToastMessages from "./components/ToastMessages";
import ChatContext from "./data/AppContext";
import { arrayIsEmpty, findAndSetData } from "./data/utilsFuns";
import routes from "./routes/routes";
import { verifyUserHasAuthenticated } from "./services/AuthApi";
const socket = IO.connect("http://localhost:3500");
function App() {
  const [isSocketConnect, setIsSocketConnect] = useState(socket.connected);
  const [lastConnect, setLastConnect] = useState(null);
  useEffect(() => {
    socket.on("connect", () => {
      setIsSocketConnect(true);
    });
    socket.on("disconnect", () => {
      setIsSocketConnect(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  const {
    settings,
    setMessages,
    userData,
    alert,
    setSocket,
    setAlert,
    setLoading,
    setUserIsAuthenticated,
    userIsAuthenticated,
  } = ChatContext();
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_user", {
        userConnectId: userData.userId,
        userInterlocutorId: null,
      });
    });
    // On verifie si l'utilisateur est
    setUserIsAuthenticated(verifyUserHasAuthenticated());
    if (!arrayIsEmpty(alert)) {
      ToastMessages(alert);
      setAlert([]);
    }
    console.log("Not connected", userIsAuthenticated);
    if (userIsAuthenticated) {
      setSocket(socket);
      socket.emit("user_connected", userData);
      (async () => {
        const [data, loading] = await findAndSetData(
          settings.main_url + "/chat",
          setMessages
        );
        setLoading(loading);
      })();
    }
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
