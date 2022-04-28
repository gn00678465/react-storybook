class Storage {
  constructor(getStorage = () => window.localStorage) {
    this.storage = getStorage();
  }

  set(key, value) {
    if (value === undefined) {
      this.remove(key);
      return;
    }
    this.storage.setItem(key, this._serialize(value));
    return value;
  }

  get(key, optionalDefaultValue) {
    const data = this.storage.getItem(key);
    return this._deserialize(data, optionalDefaultValue);
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  clearAll() {
    this.storage.clear();
  }

  _serialize(obj) {
    return JSON.stringify(obj);
  }

  _deserialize(strVal, defaultVal) {
    if (!strVal) return defaultVal;
    let val = '';
    try {
      val = JSON.parse(strVal);
    } catch (e) {
      val = strVal;
    }
    return val !== undefined ? val : defaultVal;
  }
}

export default Storage;
