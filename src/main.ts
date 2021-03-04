import { otherRed } from "./consts";
import { validateError } from "./errors";
import {
  createFileWithReplacer,
  getAllFiles,
  splitOnSeperator,
  getAllFolders,
} from "./helpers";
import { createFolders } from "./helpers/createFolders";
import { ICopyDir } from "./types";

/**
 *
 * @returns Promise<string>
 * @param {ICopyDir} options ICopyDir encapsulates one of the ways of approaching the copyDir function
 */
export async function copyTemplate(options: ICopyDir): Promise<string[]>;
/**
 *
 * @returns Promise<string>
 * @param {string} inDir - The path of the `directory` or `file` you want to copy
 * @param {string} outDir - The path of the `directory` that you should want to copy to
 * @param {Record<string, string>} vars - Vars should hold the objects that will map over the files and folders and change the templates with your own provided values
 */
export async function copyTemplate(
  inDir: string,
  outDir: string,
  vars?: Record<string, string>,
  number?: number
): Promise<string[]>;
export async function copyTemplate(
  value: ICopyDir | string,
  outDir?: string,
  vars: Record<string, string> = {},
  number = 2
): Promise<string[] | undefined> {
  const errors = await validateError(value, outDir, vars, number);
  if (errors) {
    throw new Error(otherRed(errors));
  }
  if (typeof value === "object") {
    return copyTemplateDirectory(value);
  }

  return copyTemplateDirectory({
    inDir: value,
    outDir: outDir!,
    vars,
    number,
  });
}

/* istanbul ignore next */
async function copyTemplateDirectory({
  inDir,
  outDir,
  vars = {},
  number = 2,
}: ICopyDir): Promise<string[]> {
  const [baseName] = splitOnSeperator(inDir).slice(-1);
  const folders = await getAllFolders({ base: baseName, dir: inDir });
  await Promise.all(folders.map((e) => createFolders(outDir, e, vars, number)));
  const files = await getAllFiles({ base: baseName, dir: inDir });
  const fileNames = await Promise.all(
    files.map(([rel, file]) =>
      createFileWithReplacer({ file, outDir, vars, prevPath: rel, number })
    )
  );
  return fileNames;
}
