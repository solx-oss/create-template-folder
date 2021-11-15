import { CreateTemplateConfig } from "../config";
import { otherRed } from "../consts";
import { Content } from "../utils";
import {
  JoinRepo,
  MakeFileNameRepo,
  ReadFileRepo,
  WriteFileRepo,
} from "../utils/IO";
// import { Io } from "src/utils/io-operations";

interface Execute {
  file: string;
  outDir: string;
  prevPath: string;
  vars: Record<string, string>;
  number: number;
}

interface ICreateFile {
  config?: CreateTemplateConfig;
  readFileRepo?: ReadFileRepo;
  makeFileNameRepo?: MakeFileNameRepo;
  writeFileRepo?: WriteFileRepo;
  joinRepo?: JoinRepo;
}

export class CreateFile {
  public readFileRepo: ReadFileRepo;
  public makeFileNameRepo: MakeFileNameRepo;
  public config: CreateTemplateConfig;
  public joinRepo: JoinRepo;
  public writeFileRepo: WriteFileRepo;
  /* istanbul ignore next */
  constructor(args: ICreateFile = {}) {
    const {
      /* istanbul ignore next */
      config = new CreateTemplateConfig(),
      /* istanbul ignore next */
      readFileRepo = new ReadFileRepo(),
      /* istanbul ignore next */
      makeFileNameRepo = new MakeFileNameRepo(),
      /* istanbul ignore next */
      joinRepo = new JoinRepo(),
      /* istanbul ignore next */
      writeFileRepo = new WriteFileRepo(),
    } = args;
    this.readFileRepo = readFileRepo;
    this.config = config;
    this.makeFileNameRepo = makeFileNameRepo;
    this.joinRepo = joinRepo;
    this.writeFileRepo = writeFileRepo;
  }

  // @ts-ignore
  static async createFileReplacer({
    file,
    outDir,
    prevPath,
    vars,
    number,
  }: Execute) {
    const t = new CreateFile();
    const fileContents = t.readFileRepo.execute(prevPath);
    const fileName = t.makeFileNameRepo.execute(file);

    const path = t.joinRepo.execute(outDir, fileName);
    const realPath = Content.replace(path, vars, number);
    const content = Content.replace(fileContents, vars, number);

    try {
      if (!t.config.dryRun) {
        await t.writeFile(realPath, content);
      }
      return fileName;
    } catch (error) {
      throw new Error(
        otherRed(
          `Something unexpected has happened. Please check the console for more data. ${error.message}`
        )
      );
    }
  }

  writeFile(realPath: string, content: string) {
    return this.writeFileRepo.execute(realPath, content);
  }

  async execute({
    prevPath,
    vars,
    outDir,
    file,
    number,
  }: Execute): Promise<string> {
    const t = new CreateFile();
    const fileContents = t.readFileRepo.execute(prevPath);
    const fileName = t.makeFileNameRepo.execute(file);

    const path = t.joinRepo.execute(outDir, fileName);
    const realPath = Content.replace(path, vars, number);
    const content = Content.replace(fileContents, vars, number);

    try {
      if (!t.config.dryRun) {
        await t.writeFile(realPath, content);
      }
      return fileName;
    } catch (error) {
      throw new Error(
        otherRed(
          `Something unexpected has happened. Please check the console for more data. ${error.message}`
        )
      );
    }
    // try {
    //   const fileContents = this.readFileRepo.execute(options.prevPath);

    //   const fileName = this.makeFileNameRepo.execute(options.file);

    //   const path = this.joinRepo.execute(options.outDir, options.file);

    //   // @ts-ignore
    //   const realPath = Content.replace(path, options.vars, options.number);
    //   // @ts-ignore
    //   const content = Content.replace(
    //     fileContents,
    //     options.vars,
    //     options.number
    //   );

    //   if (!this.config.dryRun) {
    //     await this.writeFileRepo.execute(realPath, content);
    //   }

    //   return fileName;
    //   /* istanbul ignore next */
    // } catch (error) {
    //   /* istanbul ignore next */
    //   throw new Error(
    //     otherRed(
    //       `Something unexpected has happened. Please check the console for more data.
    //       ${error.message}`
    //     )
    //   );
    // }
  }
}
