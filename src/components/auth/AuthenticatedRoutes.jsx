import React from "react";
import { Navigate } from "react-router-dom";
import ChatContext from "../../data/AppContext";

const AuthenticatedRoutes = ({ children }) => {
  {
    /* Quand l'utilisateur sera connecter on utilisera */
  }
  const { userIsAuthenticated } = ChatContext();
  return userIsAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthenticatedRoutes;
