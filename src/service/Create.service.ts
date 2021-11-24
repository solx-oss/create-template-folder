import { CreateTemplateConfig, createTemplateFolderConfig } from "../config";
import { otherRed } from "../consts";
import { CreateFileOptions, ICreateRepo, IFsOperations } from "../types";
import { IPathRepo } from "../types/PathRepo.interface";
import { Content } from "../utils";
import { FsOperations, PathRepo } from "../utils/IO";

export class CreateService implements ICreateRepo {
  constructor(
    private config: CreateTemplateConfig = createTemplateFolderConfig,
    private pathRepo: IPathRepo = new PathRepo(),
    private fsOps: IFsOperations = new FsOperations()
  ) {}

  async folder(
    outDir: string,
    relPath: string,
    /* istanbul ignore next */
    vars: Record<string, string> = {},
    /* istanbul ignore next */
    number: number = 2
  ) {
    const path = this.pathRepo.join(outDir, relPath);

    const realPaths = Content.replace(path, vars, number);

    if (!this.config.dryRun) {
      await this.fsOps.mkdir(realPaths);
    }
  }

  async file({ prevPath, vars, outDir, file, number }: CreateFileOptions) {
    const [fileContents, error] = await this.fsOps.readFile(prevPath);

    if (error) {
      throw new Error(error.message);
    }

    const fileName = Content.makeFileName(file);

    const path = this.pathRepo.join(outDir, fileName);

    const realPath = Content.replace(path, vars, number);

    const content = Content.replace(fileContents, vars, number);

    try {
      this.fsOps.writeFile(realPath, content);
      return fileName;
    } catch (error) {
      /* istanbul ignore next */
      throw new Error(
        otherRed(
          `Something unexpected has happened. Please check the console for more data. ${error.message}`
        )
      );
    }
  }
}
