import Chainable from "./Chainable";

export default class extends Chainable {
  constructor(parent) {
    super(parent);
    this.store = new Set();
  }

  add(key) {
    this.store.add(key);
    return this;
  }

  has(key) {
    return this.store.has(key);
  }

  delete(key) {
    this.store.delete(key);
    return this;
  }

  clear() {
    this.store.clear();
    return this;
  }
}
