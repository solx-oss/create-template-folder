import { readFileSync } from "fs";
import { encoding } from "../../consts";
import { Executor } from "../../types";

export class ReadFileRepo implements Executor {
  execute(prevPath: string): string {
    return readFileSync(prevPath, encoding);
  }
}
