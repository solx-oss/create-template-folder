import { Executor } from "../../types";
import { existsSync } from "fs";

export class FSExistsRepo implements Executor {
  /* istanbul ignore next */
  constructor(private existFunc: typeof existsSync = existsSync) {}

  execute(path: string) {
    return this.existFunc(path);
  }
}
