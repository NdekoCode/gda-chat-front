import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signin />}></Route>
      <Route path="/" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
