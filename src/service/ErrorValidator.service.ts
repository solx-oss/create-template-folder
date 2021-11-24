import {
  directoryNotEmpty,
  noOutDir,
  noSuchThing,
  notEnoughCurlies,
} from "../consts";
import { Executor, ICreateTemplate } from "../types";
import { FSExistsRepo } from "../utils/IO";

export class ObjectErrorValidator implements Executor {
  /* istanbul ignore next */
  constructor(private fsExistRepo: FSExistsRepo = new FSExistsRepo()) {}
  execute(value: ICreateTemplate): BoolStr {
    if (this.noInDir(value.inDir)) {
      return noSuchThing;
    }

    if (!value.outDir) {
      return noOutDir;
    }

    if (this.outDirExists(value.outDir)) {
      return directoryNotEmpty;
    }

    /* istanbul ignore next */
    if ((value?.number ?? 2) < 2) {
      return notEnoughCurlies;
    }

    return false;
  }

  noInDir(inDir: string) {
    console.log("inDir:", inDir);
    return !this.fsExistRepo.execute(inDir);
  }

  outDirExists(outDir: string) {
    return this.fsExistRepo.execute(outDir);
  }
}

export class StringErrorValidator implements Executor {
  /* istanbul ignore next */
  constructor(private fsExistRepo: FSExistsRepo = new FSExistsRepo()) {}

  execute = (
    inDir: string,
    outDir?: string,
    _vars?: Record<string, string>,
    number?: number
  ): BoolStr => {
    if (!this.fsExistRepo.execute(inDir)) {
      return noSuchThing;
    }
    if (!outDir) {
      return noSuchThing;
    }

    if (this.fsExistRepo.execute(outDir)) {
      return directoryNotEmpty;
    }

    if ((number ?? 2) < 2) {
      return notEnoughCurlies;
    }
    return false;
  };
}

type BoolStr = false | string;
