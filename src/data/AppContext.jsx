import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { logOut } from "../services/AuthApi";
import { useWindowSize } from "./hooksFunc";
import {
  API_URL,
  getDataStorage,
  removeItem,
  setDataStorage,
} from "./utilsFuns";

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
    userId: "",
    user: {},
    messages: [],
  });
  const [contactUsers, setContactUsers] = useState([]);
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [usersIsShown, setUsersIsShown] = useState(false);
  const [showUpdateFormular, setShowUpdateFormular] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [idUser, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState([]);
  const [socket, setSocket] = useState({});
  const [width, setWindowWidth] = useState(useWindowSize()[0]);
  const [showComponentResponsive, setShowComponentResponsive] = useState(
    width < 640
  );
  const handleUpdateForm = useCallback(() => {
    console.log("Modify form");
    setShowUpdateFormular((d) => !d);
  });

  const updateDimensions = useCallback(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
    setShowComponentResponsive(width < 640);
  }, []);

  /**
   * @description Permet de sauvegarder l'identifiant de la personne avec qui je discute ou avec qui je clique pour discuter
   * @author NdekoCode
   * @export
   * @param {String} id l'identifiant
   */
  const addInterlocutorId = useCallback((id) => {
    setId(id);
    removeItem("interlocId");
    setDataStorage("interlocId", id);
  }, []);
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
  const activeToggleBlock = useCallback(() => {
    if (showComponentResponsive) {
      setActiveBlock((state) => !state);
    }
  }, []);

  const handleVisible = () => {
    setStateVisible((d) => ({ ...d, visible: !stateSticky.visible }));
  };

  const showLoadUser = () => {
    setUsersIsShown((state) => !state);
  };

  const logOutUser = () => {
    toast.info("Vous etes deconnecter");
    setUserIsAuthenticated(false);
    socket.emit("logout_user", userData);
    logOut();
  };
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
    updateDimensions,
    idUser,
    logOutUser,
    addInterlocutorId,
    showUpdateFormular,
    setShowUpdateFormular,
    handleUpdateForm,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
});

/** @type {AppChatContext} */
const ChatContext = () => useContext(AppContext);

export default ChatContext;
