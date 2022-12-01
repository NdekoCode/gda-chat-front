import { API_URL, findAndSetData } from "../data/utilsFuns";
/**
 * @description Charge les donnée depuis une URL et modifie les etat passer en paramètre
 * @author NdekoCode
 * @export
 * @param {string} [url="/auth/contacts"]
 * @param {React.SetStateAction} setState
 * @param {React.SetStateAction} setLoadingState
 */
export async function loadData(
  setState,
  setLoadingState,
  url = "/auth/contacts"
) {
  const [data, loading] = await findAndSetData(API_URL + url, setState);
  setLoadingState(loading);

  return data;
}
