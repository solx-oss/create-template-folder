import { sep } from "path";

export function splitOnSeperator(string: string): string[] {
  return string.split(sep);
}
