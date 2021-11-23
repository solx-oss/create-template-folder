import { sep } from "path";
import { Executor } from "../../types";

export class MakeFileNameRepo implements Executor {
  constructor(private seperator: typeof sep = sep) {}
  get sep() {
    return this.seperator === "/" ? this.seperator : "\\\\";
  }
  execute(file: string) {
    return file
      .replace(new RegExp(`^${this.sep}*`, "gi"), "")
      .replace(/_(?=\.)/, "");
  }
}
