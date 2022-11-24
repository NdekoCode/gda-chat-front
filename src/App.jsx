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
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import RedirectAuthenticated from "./components/RedirectAuthenticated";
import ChatContext from "./data/AppContext";
import { findAndSetData } from "./data/utilsFuns";
import routes from "./routes/routes";
import { verifyUserHasAuthenticated } from "./services/AuthApi";
function App() {
  const {
    settings,
    setMessages,
    setLoading,
    setUserIsAuthenticated,
    userIsAuthenticated,
  } = ChatContext();
  useEffect(() => {
    // On verifie si l'utilisateur est
    setUserIsAuthenticated(verifyUserHasAuthenticated());
    (async () => {
      const [data, loading] = await findAndSetData(
        settings.main_url + "/chat",
        setMessages
      );
      setLoading(loading);
    })();
  }, [userIsAuthenticated]);
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
