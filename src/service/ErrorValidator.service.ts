import {
  directoryNotEmpty,
  noOutDir,
  noSuchThing,
  notEnoughCurlies,
} from "../consts";
import { Executor, ICopyDir } from "../types";
import { FSExistsRepo } from "../utils/IO";

export class ObjectErrorValidator implements Executor {
  constructor(private fsExistRepo: FSExistsRepo = new FSExistsRepo()) {}
  execute(value: ICopyDir): BoolStr {
    if (!this.fsExistRepo.execute(value.inDir)) {
      return noSuchThing;
    }

    if (!value.outDir) {
      return noOutDir;
    }

    if (this.fsExistRepo.execute(value.outDir)) {
      return directoryNotEmpty;
    }

    if ((value?.number ?? 2) < 2) {
      return notEnoughCurlies;
    }

    return false;
  }
}

export class StringErrorValidator implements Executor {
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
