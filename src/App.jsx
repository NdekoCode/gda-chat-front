import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

function App() {
  return (
    <Routes>
      {/* Quand l'utilisateur sera connecter on utilisera */}
      {/*!isConnect?<Navigate to="/login" replace /> :<Navigate to="/chat" />    */}
      <Route path="/" element={<Navigate to="/login" replace />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signin />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
