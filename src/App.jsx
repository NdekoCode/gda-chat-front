// TODO: #11 - Fetch Users
// TODO: #10 - Register Users
// TODO: #9 - Login user
// TODO: #8 - Load message
// TODO: #7 - Load user message
// TODO: #6 - Uplaod user image
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes";
import ChatContext from "./data/AppContext";
import { findAndSetData } from "./data/utilsFuns";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
    <Routes>
      {/* Quand l'utilisateur sera connecter on utilisera */}
      {/*!isConnect?<Navigate to="/login" replace /> :<Navigate to="/chat" />    */}
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/chat"
        element={
          <AuthenticatedRoutes>
            <Chat />{" "}
          </AuthenticatedRoutes>
        }
      ></Route>
    </Routes>
  );
}

export default App;
