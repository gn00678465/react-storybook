import Column from "./Column";
import ChainedMap from "../Chainable/ChainedMap";
import { checkValidObj, throwError } from "./utils";

class GeneratorColumn extends ChainedMap {
  constructor() {
    super();
    this.columns = new ChainedMap(this);
  }

  column(name) {
    return this.columns.getOrCompute(name, () => new Column(this, name));
  }

  delete(name) {
    this.columns.delete(name);
    return this;
  }

  find(name) {
    return this.columns.getOrCompute(name, () =>
      throwError(`${name} is not exist`)
    );
  }

  toConfig() {
    return Array.from(this.columns.values())
      .map((map) => map.toConfig())
      .filter((item) => checkValidObj(item) && item);
  }
}

export default GeneratorColumn;
