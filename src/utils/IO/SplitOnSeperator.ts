import { sep } from "path";
import { Executor } from "../../types";

export class SplitSepRepo implements Executor {
  /* istanbul ignore next */
  constructor(private seperator: typeof sep = sep) {}
  execute(str: string) {
    return str.split(this.seperator);
  }
}
