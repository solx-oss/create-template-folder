import * as fs from "fs";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { CreateTemplateConfig, createTemplateFolderConfig } from "../../config";
import { encoding } from "../../consts";
import {
  DirResponse,
  IFsOperations,
  ISyncFsOperations,
  ReadDir,
} from "../../types";
import { Golangify, MaybeError } from "../../types/Golangfify.type";

export class FsOperations implements IFsOperations {
  constructor(
    private config: CreateTemplateConfig = createTemplateFolderConfig
  ) {}

  async exists(pathToCheck: string): Promise<Golangify<boolean>> {
    try {
      // const f = fs.stat()
      await stat(pathToCheck);
      return [true, null];
    } catch (error) {
      return [false];
    }
  }
  async mkdir(pathToCreate: string): Promise<Golangify<string>> {
    try {
      if (!this.config.dryRun) {
        const mkdirResult = await mkdir(pathToCreate, { recursive: true });
        return [mkdirResult!];
      }
      return [""];
    } catch (error) {
      return ["", error as Error];
    }
  }
  async readFile(pathToRead: string): Promise<Golangify<string>> {
    try {
      const content = await readFile(pathToRead, encoding);
      return [content];
    } catch (error) {
      return ["", error as Error];
    }
  }

  async writeFile(pathToWriteTo: string, content: string): Promise<MaybeError> {
    try {
      if (!this.config.dryRun) {
        await writeFile(pathToWriteTo, content, encoding);
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

export class FsOperationsSync implements ISyncFsOperations {
  constructor(
    private config: CreateTemplateConfig = createTemplateFolderConfig
  ) {}
  exists(pathToCheck: string): Golangify<boolean> {
    try {
      fs.statSync(pathToCheck);
      return [true, null];
    } catch (error) {
      return [false];
    }
  }

  mkdir(pathToCreate: string): Golangify<string> {
    try {
      if (!this.config.dryRun) {
        const mkDirResult = fs.mkdirSync(pathToCreate, { recursive: true });
        return [mkDirResult!];
      }
      return [pathToCreate];
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
  readdir(source: string): DirResponse {
    try {
      const result = fs.readdirSync(source, { withFileTypes: true });
      return [result];
    } catch (error) {
      return [[], error as Error];
    }
  }
}
