import { join } from "path";
import { Executor } from "../../types";

export class JoinRepo implements Executor {
  constructor(private joiner: typeof join = join) {}

  execute(...files: string[]): string {
    return this.joiner(...files);
  }
}
