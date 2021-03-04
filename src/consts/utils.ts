import chalk from "chalk";
export const fsEncoding = {
  encoding: "utf-8",
};

export const otherRed = (value: string) => chalk.red(value);

// any amount (or none) white spaces
export const optionalWhiteSpace = `\\s\*`;
export const noCurliesBehind = `\(?<!{)`;
export const noCurliesAhead = `\(?!})`;
