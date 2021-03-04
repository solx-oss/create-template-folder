import { ICopyDir } from "../types";
// import { red } from "../consts";
import { fsExists } from "../helpers";
import {
  // whenNoSuchThing,
  noSuchThing,
  noOutDir,
  // whenNoInitial,
  noInitialValue,
  // whenNoOutDir,
  notEnoughCurlies,
  // whenNotEnoughCurlies,
} from "./badData.errors";

export async function validateError(
  value: ICopyDir | string,
  outDir?: string,
  _vars?: Record<string, string>,
  number?: number
): Promise<false | string> {
  if (!value) {
    return noInitialValue;
  }
  if (typeof value === "object") {
    if (!(await fsExists(value.inDir))) {
      return noSuchThing;
    }
    if (!value.outDir) {
      return noOutDir;
    }

    if ((value.number ?? 2) < 2) {
      return notEnoughCurlies;
    }
  }

  if (typeof value === "string") {
    if (!(await fsExists(value))) {
      return noSuchThing;
    }

    if (!outDir) {
      return noOutDir;
    }
    if (number! < 2) {
      return notEnoughCurlies;
    }
  }

  return false;
}
