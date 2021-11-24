import { resolve } from "path";
import { IFsOperations } from "../types";
import { FsOperations } from "../utils/IO";

export class GetAllService {
  _folders = new Set();

  constructor(private fsOps: IFsOperations = new FsOperations()) {}

  private async getAllFolders(source: string) {
    this._folders.add(source);

    const [result, error] = await this.fsOps.readdir(source);
    if (error) {
      throw new Error(error.message);
    }

    const folders = result.filter((e) => e.isDirectory());

    for (const dir of folders) {
      const res = resolve(source, dir.name);

      if (dir.isDirectory()) {
        await this.getAllFolders(res);
      } else {
        continue;
      }
    }
    return [...this._folders];
  }
}
