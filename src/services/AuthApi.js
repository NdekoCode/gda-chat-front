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
    console.log("TOken invalide");
    return removeItem("user_token");
  }

  console.log("Token valide");
  return isValid;
}
export function verifyUserData() {
  const data = getDataStorage("userData");
  if (data !== null && data !== undefined) {
    // On verifie si le tableau retourner est supérieur à 1
    return Object.keys(data).length > 0;
  }
  return false;
}
export function connectedUser(userData) {
  setDataStorage("userData", userData);
}
export async function fetchUserConnect(url, data) {
  let loading = true,
    userResponse;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
    return [error, loading];
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
export async function login(dataForm) {
  const loginUrl = API_URL + "/auth/login";
  try {
    const [loginData] = await fetchUserConnect(loginUrl, dataForm);
    if (loginData.userData) {
      setDataStorage("userData", loginData.userData);
      setDataStorage("user_token", loginData.userData.token);
      return true;
    }
  } catch (error) {
    console.log("Erreur survenus lors l'authentification " + error.message);
  }
  return false;
}
export function register(dataForm) {
  const registerUrl = API_URL + "/auth/register";
  const { alert } = fetchUserConnect(registerUrl, dataForm);
  if (alert.statusCode < 400) {
    const userData = {
      email: dataForm.email,
      password: dataForm.password,
    };
    return login(userData);
  }
}
