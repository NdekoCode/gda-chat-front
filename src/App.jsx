import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatContext from "./data/AppContext";
import { findAndSetData } from "./data/utilsFuns";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const { settings, setMessages, setLoading } = ChatContext();
  useEffect(() => {
    (async () => {
      const [data, loading] = await findAndSetData(
        settings.main_url + "/chat",
        setMessages
      );
      setLoading(loading);
    })();
  }, []);
  return (
    <Routes>
      {/* Quand l'utilisateur sera connecter on utilisera */}
      {/*!isConnect?<Navigate to="/login" replace /> :<Navigate to="/chat" />    */}
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
