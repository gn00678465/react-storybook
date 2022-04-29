export default function (namespace) {
  if (!namespace) {
    namespace = '';
  }
  const namespacePrefix = namespace || '';
  const legalNamespace = /^[a-zA-Z0-9_-]*$/;
  if (!legalNamespace.test(namespace)) {
    throw new TypeError('namespace 只接受字母和數字以及 _ 和 -');
  }
  return {
    namespacePrefix: namespacePrefix,
    set(key, value) {
      if (value === undefined) {
        this.remove(key);
        return;
      }
      window.localStorage.setItem(
        this.namespacePrefix + key,
        this._serialize(value),
      );
      return value;
    },
    get(key, optionalDefaultValue) {
      const data = window.localStorage.getItem(this.namespacePrefix + key);
      return this._deserialize(data, optionalDefaultValue);
    },
    remove(key) {
      window.localStorage.removeItem(this.namespacePrefix + key);
    },

    clearAll() {
      window.localStorage.clear();
    },
    _serialize(obj) {
      return JSON.stringify(obj);
    },
    _deserialize(strVal, defaultVal) {
      if (!strVal) return defaultVal;
      let val = '';
      try {
        val = JSON.parse(strVal);
      } catch (e) {
        val = strVal;
      }
      return val !== undefined ? val : defaultVal;
    },
  };
}
