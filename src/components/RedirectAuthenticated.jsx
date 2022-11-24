import React from "react";
import { Navigate } from "react-router-dom";
import ChatContext from "../data/AppContext";

const RedirectAuthenticated = ({ children }) => {
  {
    /* Quand l'utilisateur sera connecter on utilisera */
  }
  const { userIsAuthenticated } = ChatContext();
  return userIsAuthenticated ? <Navigate to="/chat" replace /> : children;
};

export default RedirectAuthenticated;
