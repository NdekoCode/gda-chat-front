/**
 * @description Nous retourne une portion d'une chaine de caractère suivis des points de suspensions
 * @author NdekoCode
 * @export
 * @param {string} str La chaine de caractère à scinder
 * @param {number} [length=20]
 * @return {string}
 */
export function catString(str, length = 20) {
  if (str.length > length) {
    return str.substring(0, length) + "...";
  }
  return str;
}
/**
 * @description permet de convertir et d'arrondir un nombre de floatant avec les nombres après la virgule qu'on veut
 * @author NdekoCode
 * @export
 * @param {string|number} nbr
 * @param {number} [length=1]
 * @return {number}
 */
export function catFloatNumber(nbr, length = 1) {
  return parseFloat(nbr.toFixed(length));
}
/**
 * @description Permet de récuperer une information dans le localStorage
 * @author NdekoCode
 * @export
 * @param {string} key la clé ou l'identifiant de la donnée à recuperer
 * @return {*}
 */
export function getDataStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
/**
 * @description Supprime un element dans le localStorage
 * @author NdekoCode
 * @export
 * @param {*} key
 */
export function removeItem(key) {
  localStorage.removeItem(key);
}
/**
 * @description Modifie une information dans le localStorage
 * @author NdekoCode
 * @export
 * @param {string} key la clé ou l'identifiant de la donnée à modifier
 * @param {any} value
 */
export function setDataStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export async function fetchData(url) {
  const token = getDataStorage("user_token");
  let data = [],
    loading = true;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(url, params);
    const responseData = await response.json();
    if (response.ok) {
      data = responseData;
      loading = false;
    }

    console.log(responseData);
  } catch (error) {
    console.log("Error lors de la récuperation des donnée " + error.message);
    loading = false;
  }
  return [data, loading];
}
export async function findAndSetData(url, setData) {
  const [data, loading] = await fetchData(url);
  if (!isVarEmpty(data)) {
    setData(data);
  }
  return [data, loading];
}

export function objectIsEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export function toStr(val) {
  val.toString();
}

export function isVarEmpty(value) {
  return value === undefined || value === null;
}
export function arrayIsEmpty(arr) {
  return !isVarEmpty(arr) && arr.length < 1;
}
export function formatTime(dateTime) {
  return new Date(dateTime).toLocaleTimeString().substring(0, 5);
}
export const API_URL = import.meta.env.VITE_API_URL;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
