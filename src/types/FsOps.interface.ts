import type { Dirent } from "fs";
import { MaybeError, Golangify } from "./Golangfify.type";

type ReadDirResponse = Dirent[];
export type DirResponse = Golangify<ReadDirResponse>;
export type ReadDir = Promise<Golangify<ReadDirResponse>>;

export interface IFsOperations {
  exists(pathToCheck: string): Promise<Golangify<boolean>>;
  mkdir(pathToCreate: string): Promise<Golangify<string>>;
  readFile(pathToRead: string): Promise<Golangify<string>>;
  writeFile(pathToWriteTo: string, content: string): Promise<MaybeError>;
  readdir(source: string): ReadDir;
}
export interface ISyncFsOperations {
  exists(pathToCheck: string): Golangify<boolean>;
  mkdir(pathToCreate: string): Golangify<string>;
  readFile(pathToRead: string): Golangify<string>;
  writeFile(pathToWriteTo: string, content: string): MaybeError;
  readdir(source: string): DirResponse;
}
