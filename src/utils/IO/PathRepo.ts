import { IPathRepo } from "../../types/PathRepo.interface";
import { sep, join } from "path";

export class PathRepo implements IPathRepo {
  sep = sep;
  join(...paths: string[]): string {
    return join(...paths);
  }
}
