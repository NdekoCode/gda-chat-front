import { getDataStorage, setDataStorage } from "../data/utilsFuns";
/**
 * @description Verifie si l'utilisateur est connecter, pour sela il verifie si ses donner sont présente dans le localStorage
 * @author NdekoCode
 * @export
 * @return {boolean}
 */
export function verifyUserHasAuthenticated() {
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
export function disconnectedUser() {
  return localStorage.removeItem("userData");
}