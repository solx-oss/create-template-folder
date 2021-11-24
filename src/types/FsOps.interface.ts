import type { Dirent } from "fs";
import { MaybeError, Golangify } from "./Golangfify.type";

type ReadDirResponse = Dirent[];
export type ReadDir = Promise<Golangify<ReadDirResponse>>;

export interface IFsOperations {
  exists(pathToCheck: string): Golangify<boolean>;
  mkdir(pathToCreate: string): Golangify<string>;
  readFile(pathToRead: string): Golangify<string>;
  writeFile(pathToWriteTo: string, content: string): MaybeError;
  readdir(source: string): ReadDir;
}
