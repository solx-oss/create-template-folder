import * as fs from "fs";
import { CreateTemplateConfig, createTemplateFolderConfig } from "../../config";
import { encoding } from "../../consts";
import { IFsOperations, ReadDir } from "../../types";
import { Golangify, MaybeError } from "../../types/Golangfify.type";

export class FsOperations implements IFsOperations {
  constructor(
    private config: CreateTemplateConfig = createTemplateFolderConfig
  ) {}

  exists(pathToCheck: string): Golangify<boolean> {
    try {
      const exists = fs.existsSync(pathToCheck);
      return [exists, null];
    } catch (error) {
      return [false];
    }
  }
  mkdir(pathToCreate: string): Golangify<string> {
    try {
      if (!this.config.dryRun) {
        const mkdir = fs.mkdirSync(pathToCreate, { recursive: true });
        return [mkdir!];
      }
      return [""];
    } catch (error) {
      return ["", error as Error];
    }
  }
  readFile(pathToRead: string): Golangify<string> {
    try {
      const content = fs.readFileSync(pathToRead, encoding);
      return [content];
    } catch (error) {
      return ["", error as Error];
    }
  }
  writeFile(pathToWriteTo: string, content: string): MaybeError {
    try {
      if (!this.config.dryRun) {
        fs.writeFileSync(pathToWriteTo, content, encoding);
        return;
      }
    } catch (error) {
      return error as Error;
    }
  }

  async readdir(source: string): ReadDir {
    try {
      const result = await fs.promises.readdir(source, { withFileTypes: true });
      return [result];
    } catch (error) {
      return [[], error as Error];
    }
  }
}
