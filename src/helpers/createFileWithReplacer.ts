import fs from "fs-extra";

import { join, sep } from "path";
import { fsEncoding } from "../consts";
import { contentReplacer } from "./contentReplacer";

export async function createFileWithReplacer({
  file,
  outDir,
  prevPath,
  vars,
  number,
}: {
  file: string;
  outDir: string;
  prevPath: string;
  vars: Record<string, string>;
  number: number;
}) {
  const fileContents = await fs.readFile(prevPath, fsEncoding);
  const fileName = file.replace(new RegExp(`^${sep}*`, "gi"), "");
  const path = join(outDir, fileName);
  const realPath = contentReplacer(path, vars, number);
  const content = contentReplacer(fileContents, vars, number);
  // try {
  await fs.writeFile(realPath, content, fsEncoding);
  return fileName;
  // } catch (error) {
  //   console.log("error:", error);
  //   throw new Error(error);
  // }
}
