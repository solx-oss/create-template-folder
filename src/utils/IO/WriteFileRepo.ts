import * as fs from "fs";
import { encoding } from "../../consts";
import { Executor } from "../../types";

export class WriteFileRepo implements Executor {
  async execute(realPath: string, content: string): Promise<void> {
    return fs.writeFileSync(realPath, content, encoding);
  }
}
