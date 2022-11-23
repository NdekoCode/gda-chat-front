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
