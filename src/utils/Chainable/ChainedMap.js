import Chainable from "./Chainable";

export default class extends Chainable {
  constructor(parent) {
    super(parent);
    this.store = new Map();
  }

  extend(methods) {
    this.shorthands = methods;
    methods.forEach((method) => {
      this[method] = (value) => this.set(method, value);
    });
    return this;
  }

  set(key, value) {
    this.store.set(key, value);
    return this;
  }

  get(key) {
    return this.store.get(key);
  }

  delete(key) {
    this.store.delete(key);
    return this;
  }

  has(key) {
    return this.store.has(key);
  }

  getOrCompute(key, fn) {
    if (!this.has(key)) {
      this.set(key, fn());
    }
    return this.get(key);
  }

  clear() {
    this.store.clear();
    return this;
  }

  order() {
    const entries = [...this.store].reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    const names = Object.keys(entries);
    const order = [...names];

    names.forEach((name) => {
      if (!entries[name]) {
        return;
      }

      const { __before, __after } = entries[name];

      if (__before && order.includes(__before)) {
        order.splice(order.indexOf(name), 1);
        order.splice(order.indexOf(__before), 0, name);
      } else if (__after && order.includes(__after)) {
        order.splice(order.indexOf(name), 1);
        order.splice(order.indexOf(__after) + 1, 0, name);
      }
    });

    return { entries, order };
  }

  values() {
    const { entries, order } = this.order();

    return order.map((name) => entries[name]);
  }

  entries() {
    const { entries, order } = this.order();

    if (order.length) {
      return entries;
    }

    return undefined;
  }

  when(
    condition,
    whenTruthy = Function.prototype,
    whenFalsy = Function.prototype
  ) {
    if (condition) {
      whenTruthy(this);
    } else {
      whenFalsy(this);
    }

    return this;
  }
}
