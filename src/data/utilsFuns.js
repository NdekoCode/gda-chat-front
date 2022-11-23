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
