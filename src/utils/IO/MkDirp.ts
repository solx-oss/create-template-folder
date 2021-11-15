import { mkdirp } from "fs-extra";
import { Executor } from "../../types";

export class MkDirPRepo implements Executor {
  constructor(private mkdirpFunc: typeof mkdirp = mkdirp) {}
  execute(thePath: string) {
    return this.mkdirpFunc(thePath);
  }
}
