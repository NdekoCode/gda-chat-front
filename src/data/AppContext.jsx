/**
 * @typedef { object } AppChatContext
 * @property { object < { main_url:string, token:string } > } settings Les paramètres de notre application server
 * @property { React.SetStateAction } setSettings Modifie les paramètres de l'application
 * @property { object } userData Les données de l'utilisateur connecter
 * @property { React.SetStateAction } setUserData Modifie Les données de l'utilisateur connecter
 * @property { boolean } userIsAuthenticated Verifie si l'utilisateur est connecter ou pas
 * @property { React.SetStateAction } setUserIsAuthenticated Modifie si l'utilisateur est connecter ou pas
 * @property { boolean } isLoading Verifie si il y a un chargement AJAX
 * @property { React.SetStateAction } setLoading Modifie l'Etat d'un chargement AJAX
 * @property { string } searchUser La recherche de l'utilisateur
 * @property { React.SetStateAction } setSearchUser Modifie La recherche de l'utilisateur
 * @property { array<object> } messages Les messages de l'utilisateur
 * @property { React.SetStateAction } setMessages Modifie Les messages de l'utilisateur
 * @property { string } users Les utilisateurs de l'application
 * @property { React.SetStateAction } setUsers Modifie Les utilisateurs de l'application
 *
 *
 */

import { createContext, memo, useContext, useState } from "react";
import { API_URL, getDataStorage } from "./utilsFuns";

/** @type {React.Context} */
const AppContext = createContext();

/** @type {React.Provider} */
export const ContextProvider = memo(({ children }) => {
  const [settings, setSettings] = useState({
    main_url: API_URL,
    token: getDataStorage("userData")?.token,
  });

  const [userData, setUserData] = useState(getDataStorage("userData"));
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState([]);

  const [stateSticky, setStateVisible] = useState({
    visible: false,
    classVisible: "",
  });
  const handleVisible = () => {
    setStateVisible((d) => ({ ...d, visible: !stateSticky.visible }));
  };
  /** @type {AppChatContext} */
  const value = {
    settings,
    setSettings,
    userData,
    setUserData,
    userIsAuthenticated,
    setUserIsAuthenticated,
    isLoading,
    setLoading,
    searchUser,
    setSearchUser,
    messages,
    setMessages,
    users,
    setUsers,
    stateSticky,
    setStateVisible,
    handleVisible,
    alert,
    setAlert,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

/** @type {AppChatContext} */
const ChatContext = () => useContext(AppContext);

export default ChatContext;
