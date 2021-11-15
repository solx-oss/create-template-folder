import { sep } from "path";
import { Executor } from "../../types";

export class MakeFileNameRepo implements Executor {
  constructor(private seperator: typeof sep = sep) {}
  execute(file: string) {
    return file
      .replace(new RegExp(`^${this.seperator}*`, "gi"), "")
      .replace(/_(?=\.)/, "");
  }
}
