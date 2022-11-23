import { createContext, memo, useContext, useState } from "react";
/**
 * @typedef {object} AppChatContext
 * @property {object<{main_url:string,token:string }>} settings Les paramètres de notre application server
 * @property {React.SetStateAction} setSettings Modifie les paramètres de l'application
 * @property {object} userData Les données de l'utilisateur connecter
 * @property {React.SetStateAction} setUserData Modifie Les données de l'utilisateur connecter
 * @property {boolean} userIsConnect Verifie si l'utilisateur est connecter ou pas
 * @property {React.SetStateAction} setUserIsConnect Modifie si l'utilisateur est connecter ou pas
 * @property {boolean} isLoading Verifie si il y a un chargement AJAX
 * @property {React.SetStateAction} setLoading Modifie l'Etat d'un chargement AJAX
 * @property {string} searchUser La recherche de l'utilisateur
 * @property {React.SetStateAction} setSearchUser Modifie La recherche de l'utilisateur
 * @property {string} messages Les messages de l'utilisateur
 * @property {React.SetStateAction} setMessages Modifie Les messages de l'utilisateur
 * @property {string} users Les utilisateurs de l'application
 * @property {React.SetStateAction} setUsers Modifie Les utilisateurs de l'application
 *
 *
 */

/** @type {React.Context} */
const AppContext = createContext();
/** @type {React.Provider} */
export const ContextProvider = memo(({ children }) => {
  const [settings, setSettings] = useState({
    main_url: "http://localhost:3500/api/v1",
    token: "",
  });
  const [userData, setUserData] = useState({});
  const [userIsConnect, setUserIsConnect] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  /** @type {*} */
  const value = {
    settings,
    setSettings,
    userData,
    setUserData,
    userIsConnect,
    setUserIsConnect,
    isLoading,
    setLoading,
    searchUser,
    setSearchUser,
    messages,
    setMessages,
    users,
    setUsers,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});
/** @type {AppChatContext} */
const ChatContext = () => useContext(AppContext);
export default ChatContext;
