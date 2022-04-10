/**
 *
 * @param {string[]} arr
 * @return {Boolean}
 */
 export function checkValidArr(arr) {
  return !!(arr && Array.isArray(arr) && arr.length);
}

/**
 *
 * @param {*} msg
 * @param  {string[]} args
 */
export function displayWarn(msg, ...args) {
  console.warn(msg, ...args);
}

/**
 *
 * @param {String} msg
 * @return {Error}
 */
export function throwError(msg) {
  throw new Error(msg);
}

/**
 *
 * @param {{
 * title: string | undefine,
 * name: string | undefine
 * }} obj
 * @return {Boolean}
 */
export function checkValidObj(obj) {
  return (
    !!obj &&
    typeof obj === "object" &&
    checkValidArr(Object.keys(obj)) &&
    "key" in obj &&
    "title" in obj
  );
}

/**
 *
 * @param {string[]} source [key] or [key, title]
 * @return {{
 * key: string,
 * title: string
 * }}
 */
export function makeObj(source) {
  if (checkValidArr(source) && source.length === 1) {
    return {
      key: source[0],
      title: source[0]
    };
  }
  if (checkValidArr(source) && source.length >= 2) {
    const [key, title] = source;
    return { key, title };
  }
  return displayWarn(source, "is not a valid data");
}
