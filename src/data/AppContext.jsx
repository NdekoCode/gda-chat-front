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

import { createContext, memo, useContext, useEffect, useState } from "react";
import { API_URL, getDataStorage } from "./utilsFuns";

/** @type {React.Context} */
const AppContext = createContext();

/** @type {React.Provider} */
export const ContextProvider = memo(({ children }) => {
  const [settings, setSettings] = useState({
    main_url: API_URL,
    token: getDataStorage("user_token"),
  });

  const [userData, setUserData] = useState(getDataStorage("userData"));
  const [selectedUser, setSelectedUser] = useState({
    user: "",
    messages: [],
  });
  const [contactUsers, setContactUsers] = useState([]);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [usersIsShown, setUsersIsShown] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState([]);
  const [socket, setSocket] = useState({});
  const [width, setWindowWidth] = useState(0);
  const [showComponentResponsive, setShowComponentResponsive] = useState(
    width < 640
  );
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);
  const [stateSticky, setStateVisible] = useState({
    visible: false,
    classVisible: "",
  });
  const [activeBlock, setActiveBlock] = useState(false);
  const activeToggleBlock = () => {
    setActiveBlock((state) => !state);
  };
  const handleVisible = () => {
    setStateVisible((d) => ({ ...d, visible: !stateSticky.visible }));
  };

  const showLoadUser = () => {
    setUsersIsShown((state) => !state);
  };
  const addNewContact = (newContact) => {
    for (let contact of contactUsers) {
      if (
        (contact._id !== newContact._id ||
          contact.email !== newContact.email) &&
        contact._id !== userData.userId
      ) {
        setContactUsers((state) => [newContact, ...state]);
        console.log(
          "New user ",
          newContact.firstName,
          newContact.lastName,
          newContact.email
        );
        console.log(contact._id, newContact._id, contact.email);
      }
    }
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
    selectedUser,
    setSelectedUser,
    contactUsers,
    addNewContact,
    socket,
    setSocket,
    setContactUsers,
    usersIsShown,
    setUsersIsShown,
    showLoadUser,
    activeToggleBlock,
    activeBlock,
    setActiveBlock,
    showComponentResponsive,
    setShowComponentResponsive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

/** @type {AppChatContext} */
const ChatContext = () => useContext(AppContext);

export default ChatContext;
