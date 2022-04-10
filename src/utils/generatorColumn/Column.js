import ChainedMap from "../Chainable/ChainedMap";
import Orderable from "../Chainable/Orderable";
import { checkValidObj, throwError } from "./utils";

class Column extends ChainedMap {
  constructor(parent, name) {
    super(parent);
    this.name = name;
    this.extend([
      "type",
      "title",
      "key",
      "width",
      "minWidth",
      "maxWidth",
      "align",
      "className",
      "fixed",
      "ellipsis",
      "tooltip",
      "tooltipTheme",
      "tooltipMaxWidth",
      "render",
      "renderHeader",
      "indexMethod",
      "sortable",
      "sortMethod",
      "sortType",
      "filters",
      "filterMethod",
      "filterMultiple",
      "filteredValue",
      "filterRemote",
      "children",
      "resizable",
      "tree",
      "display"
    ]);
  }

  init(obj) {
    if (checkValidObj(obj)) {
      for (const [key, value] of Object.entries(obj)) {
        this.set(key, value);
      }
    } else {
      throwError(`${obj} must have 'key' & 'title' property`);
    }
    return this;
  }

  merge(obj, omit = []) {
    Object.keys(obj).forEach((key) => {
      if (omit.includes(key)) return;
      const value = obj[key];
      this.set(key, value);
    });
    return this;
  }

  toConfig() {
    return Array.from(this.store.entries()).reduce((obj, item) => {
      const [key, value] = item;
      obj[key] = value;
      return obj;
    }, {});
  }
}

export default Orderable(Column);
