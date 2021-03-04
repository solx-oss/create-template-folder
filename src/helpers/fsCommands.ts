import fs from "fs-extra";
export async function fsExists(path: string) {
  return fs.pathExists(path);
}
