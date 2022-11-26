// TODO: #11 - Fetch Users
// TODO: #10 - Register Users
// TODO: #9 - Login user
// TODO: #8 - Load message
// TODO: #7 - Load user message
// TODO: #6 - Uplaod user image
// TODO: #16  - User register
// TODO: #17  - User login
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IO from "socket.io-client";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import RedirectAuthenticated from "./components/RedirectAuthenticated";
import ToastMessages from "./components/ToastMessages";
import ChatContext from "./data/AppContext";
import { arrayIsEmpty, findAndSetData } from "./data/utilsFuns";
import routes from "./routes/routes";
import { verifyUserHasAuthenticated } from "./services/AuthApi";
const socket = IO.connect("/localhost:3500");
function App() {
  const {
    settings,
    setMessages,
    alert,
    setSocket,
    setAlert,
    setLoading,
    setUserIsAuthenticated,
    userIsAuthenticated,
  } = ChatContext();
  useEffect(() => {
    // On verifie si l'utilisateur est
    setUserIsAuthenticated(verifyUserHasAuthenticated());
    if (!arrayIsEmpty(alert)) {
      ToastMessages(alert);
      setAlert([]);
    }
    console.log("Not connected", userIsAuthenticated);
    if (userIsAuthenticated) {
      setSocket(socket);
      (async () => {
        const [data, loading] = await findAndSetData(
          settings.main_url + "/chat",
          setMessages
        );
        setLoading(loading);
      })();
    }
  }, [userIsAuthenticated, socket]);
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
