import { createTemplateFolderConfig } from "./config";
import { otherRed } from "./consts";
import { CreateTemplateFolder } from "./CreateTemplateFolder";
import { ObjectErrorValidator, StringErrorValidator } from "./service";
import { ICreateTemplate, IDryRun } from "./types";

/**
 *
 * @returns Promise<string>
 * @param {ICreateTemplate} options ICopyDir encapsulates one of the ways of approaching the copyDir function
 * @param {IDryRun} dryRunOption ICopyDir encapsulates one of the ways of approaching the copyDir function
 */
export async function createTemplateFolder(
  options: ICreateTemplate,
  dryRunOption?: IDryRun
): Promise<string[]>;
/**
 *
 * @returns Promise<string>
 * @param {string} inDir - The path of the `directory` or `file` you want to copy
 * @param {string} outDir - The path of the `directory` that you should want to copy to
 * @param {Record<string, string>} vars - Vars should hold the objects that will map over the files and folders and change the templates with your own provided values
 */
export async function createTemplateFolder(
  inDir: string,
  outDir: string,
  vars?: Record<string, string>,
  number?: number,
  dryRunOption?: IDryRun
): Promise<string[]>;
export async function createTemplateFolder(
  value: ICreateTemplate | string,
  outDir?: IDryRun | string,
  vars: Record<string, string> = {},
  number = 2,
  dryRunOption: IDryRun = { dryRun: false }
): Promise<string[] | undefined> {
  const createTemplate = new CreateTemplateFolder();
  if (typeof value === "object") {
    // @ts-ignore
    const dryRun = (outDir as IDryRun)?.dryRun ?? false;
    createTemplateFolderConfig.init(dryRun);
    const errorBase = new ObjectErrorValidator();
    const validation = errorBase.execute(value);
    if (validation) {
      throw new Error(otherRed(validation));
    }

    return createTemplate.execute(value);

    // return copyTemplateDirectory({ ...value });
  }
  createTemplateFolderConfig.init(!!dryRunOption.dryRun);
  const errorBase = new StringErrorValidator();
  const validation = errorBase.execute(value, outDir as string, vars, number);

  if (validation) {
    throw new Error(otherRed(validation));
  }

  return createTemplate.execute({
    inDir: value,
    outDir: outDir as string,
    vars,
    number,
  });
}
