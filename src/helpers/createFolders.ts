import fs from "fs-extra";
import { join } from "path";
import { contentReplacer } from "./contentReplacer";

export async function createFolders(
  outDir: string,
  relPath: string,
  vars: Record<string, string> = {},
  number: number = 2
) {
  const path = join(outDir, relPath);
  const realPaths = contentReplacer(path, vars, number);
  return fs.mkdirp(realPaths);
}
