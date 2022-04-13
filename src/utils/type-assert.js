function typeOf(assert) {
  return (x) => {
    const type = Object.prototype.toString.call(x);
    return assert.includes(type);
  };
}

/**
 * 判斷是否為 function
 * @param {*} x
 * @returns {Boolean}
 */
export const isFunction = (x) => {
  return typeOf([
    '[object Function]',
    '[object AsyncFunction]',
    '[object GeneratorFunction]',
    '[object AsyncGeneratorFunction]',
  ])(x);
};

/**
 * 判斷是否為 object
 * @param {*} x
 * @returns {Boolean}
 */
export const isObject = (x) => {
  return typeOf(['[object Object]'])(x);
};

/**
 * 判斷是否為 array
 * @param {*} x
 * @returns {Boolean}
 */
export const isArray = (x) => {
  return typeOf(['[object Array]'])(x);
};

/**
 *
 * @param {String} name
 * @param {*} p
 * @return {TypeError}
 */
export const assertPromise = (name, p) => {
  if (p === null || !isFunction(p.then)) {
    throw new TypeError(
      '`' + name + '` expected a Promise, received ' + JSON.stringify(p),
    );
  }
};
