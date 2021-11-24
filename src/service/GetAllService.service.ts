import { resolve } from "path";
import { IFsOperations, ISyncFsOperations } from "../types";
import { Content } from "../utils";
import { FsOperations, FsOperationsSync } from "../utils/IO";

export class GetAllServiceSync {
  _folders = new Set<string>();
  _files = new Set<string>();

  constructor(private fsOps: ISyncFsOperations = new FsOperationsSync()) {}

  private getAllFolders(source: string) {
    this._folders.add(source);

    const [result, error] = this.fsOps.readdir(source);

    if (error) {
      throw new Error(error.message);
    }

    const folders = result.filter((e) => e.isDirectory());

    for (const dir of folders) {
      const res = resolve(source, dir.name);

      if (dir.isDirectory()) {
        this.getAllFolders(res);
      } else {
        continue;
      }
    }
    return [...this._folders];
  }

  private setFolders(source: string) {
    this._folders = new Set(this.getAllFolders(source));
  }

  get folderArr() {
    return [...this._folders];
  }

  folders(source: string, base: string) {
    this.setFolders(source);
    return Content.makeFolderStruct(this.folderArr, base);
  }

  private getAllFiles(source: string) {
    const [subDirs, error] = this.fsOps.readdir(source);

    if (error) {
      throw new Error(error.message);
    }

    const files: any[] = subDirs.map((dir) => {
      const res = resolve(source, dir.name);
      return dir.isDirectory() ? this.getAllFiles(res) : res;
    });

    return files.reduce((a, f) => a.concat(f), []);
  }

  private setFiles(source: string) {
    this._files = new Set(this.getAllFiles(source));
  }

  get fileArr() {
    return [...this._files];
  }

  files(source: string, baseName: string) {
    this.setFiles(source);

    return Content.makeFileStruct(this.fileArr, baseName);
  }
}

export class GetAllService {
  _folders = new Set<string>();
  _files = new Set<string>();

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

  private async setFolders(source: string) {
    this._folders = new Set(await this.getAllFolders(source));
  }

  get folderArr() {
    return [...this._folders];
  }

  async folders(source: string, base: string) {
    await this.setFolders(source);

    return Content.makeFolderStruct(this.folderArr, base);
  }

  private async getAllFiles(source: string) {
    const [subDirs, error] = await this.fsOps.readdir(source);
    if (error) {
      throw new Error(error.message);
    }
    const files: any[] = await Promise.all(
      subDirs.map(async (dir) => {
        const res = resolve(source, dir.name);
        return dir.isDirectory() ? this.getAllFiles(res) : res;
      })
    );

    return files.reduce((a, f) => a.concat(f), []);
  }

  private async setFiles(source: string) {
    this._files = new Set(await this.getAllFiles(source));
  }

  get fileArr() {
    return [...this._files];
  }

  async files(source: string, baseName: string) {
    await this.setFiles(source);

    return Content.makeFileStruct(this.fileArr, baseName);
  }
}
