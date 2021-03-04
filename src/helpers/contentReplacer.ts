import { noCurliesAhead, noCurliesBehind, optionalWhiteSpace } from "../consts";

export function contentReplacer(
  str: string,
  vars: Record<string, string> = {},
  number = 2
) {
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
