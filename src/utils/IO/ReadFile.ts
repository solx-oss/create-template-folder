import { readFileSync } from "fs";
import { encoding } from "../../consts";
import { Executor } from "../../types";

export class ReadFileRepo implements Executor {
  constructor(private readFile: typeof readFileSync = readFileSync) {}
  execute(prevPath: string): string {
    return this.readFile(prevPath, encoding);
  }
}
