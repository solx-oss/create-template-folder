import { noCurliesAhead, noCurliesBehind, optionalWhiteSpace } from "../consts";
import { sep } from "path";

export class Content {
  static get sep() {
    return sep === "/" ? sep : "\\\\";
  }

  static makeFileName(file: string) {
    return file
      .replace(new RegExp(`^${this.sep}*`, "gi"), "")
      .replace(/_(?=\.)/, "");
  }

  static makeFolderStruct(folders: string[], base: string) {
    return folders.map((e) => {
      const folderInformation = e.split(base).slice(-1)[0];
      if (!folderInformation) {
        return this.sep;
      }
      return folderInformation;
    });
  }

  static makeFileStruct(files: string[], base: string) {
    return files.map((e) => [
      e,
      e.split(new RegExp(`${base}${this.sep}`)).slice(-1)[0],
    ]);
  }

  static replace(str: string, vars: Record<string, string> = {}, number = 2) {
    const keys = Object.keys(vars);
    if (!keys.length) {
      return str;
    }

    const regBase = keys
      .map((e) => {
        const leftSide = `\{`.repeat(number);
        const rightSide = `\}`.repeat(number);
        const regConstructor = `${noCurliesBehind}${leftSide}${optionalWhiteSpace}${e}${optionalWhiteSpace}${rightSide}${noCurliesAhead}`;
        return regConstructor;
      })
      .join("|");

    const regex = new RegExp(regBase, "g");

    return str.replace(regex, (matched: any) => {
      const insideBrackets = /[^{\}]+(?=})/g.exec(matched)!;
      return vars[insideBrackets[0].trim()];
    });
  }
}
