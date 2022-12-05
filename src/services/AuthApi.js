import jwtDecode from "jwt-decode";
import {
  API_URL,
  getDataStorage,
  removeItem,
  setDataStorage,
} from "../data/utilsFuns";
/**
 * @description Verifie si l'utilisateur est connecter, pour sela il verifie si ses donner sont présente dans le localStorage
 * @author NdekoCode
 * @export
 * @return {boolean}
 */
export function verifyUserHasAuthenticated() {
  const token = getDataStorage("user_token");
  const isValid = token ? tokenIsValid(token) : false;
  if (!isValid) {
    removeItem("user_token");
    return false;
  }
  return isValid;
}
export function verifyUserData() {
  return verifyUserHasAuthenticated();
}
export function connectedUser(userData) {
  setDataStorage("userData", userData);
}
export async function fetchUserConnect(url, data) {
  const token = getDataStorage("user_token");
  let loading = true,
    userResponse;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, params);
    userResponse = await response.json();
    if (response.ok) {
      loading = false;
    }
  } catch (error) {
    loading = false;

    const alert = {
      message:
        "Erreur survenus lors du traitement de la requete " + error.message,
      statusCode: 500,
      type: "danger",
    };
    return [{ alert }, loading];
  }
  return [userResponse, loading];
}
/**
 * @description Pour deconnecter un utilisateur
 * @author NdekoCode
 * @export
 * @return {void}
 */
export function logOut() {
  removeItem("userData");
  removeItem("user_token");
}
export function tokenIsValid(token) {
  const { exp } = jwtDecode(token);
  return exp * 1000 > new Date().getTime();
}
export async function updateUser(dataForm, id, setAlert = null) {
  const url = API_URL + "/auth/user/update/" + id;
  const [responseUserData] = await fetchUserConnect(url, dataForm);
  const { alert } = responseUserData;
  if (alert.statusCode < 400) {
    return [userData, true];
  }
  setAlert(alert);
  return [alert, false];
}
export async function login(dataForm) {
  const loginUrl = API_URL + "/auth/login";
  try {
    const [loginData] = await fetchUserConnect(loginUrl, dataForm);
    const { alert } = loginData;
    if (alert.statusCode < 400) {
      setDataStorage("userData", loginData.userData);
      setDataStorage("user_token", "Bearer " + loginData.userData.token);
      setDataStorage("users", []);
      return [alert, true];
    }

    return [alert, false];
  } catch (error) {
    const alert = {
      message: "Erreur survenus lors l'authentification " + error.message,
      statusCode: 500,
      type: "Danger",
    };

    return [alert, false];
  }
}
export async function register(dataForm) {
  const registerUrl = API_URL + "/auth/register";
  const [responseUserData] = await fetchUserConnect(registerUrl, dataForm);
  const { alert } = responseUserData;

  if (alert.statusCode < 400 && alert.statusCode !== 309) {
    const userData = {
      email: dataForm.email,
      password: dataForm.password,
    };
    return [userData, true];
  }
  return [alert, false];
}
