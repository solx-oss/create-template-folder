import { otherRed } from "../consts";
import { Content } from "../utils";
import {
  JoinRepo,
  MakeFileNameRepo,
  ReadFileRepo,
  WriteFileRepo,
} from "../utils/IO";

interface Execute {
  file: string;
  outDir: string;
  prevPath: string;
  vars: Record<string, string>;
  number: number;
}

interface ICreateFile {
  readFileRepo?: ReadFileRepo;
  makeFileNameRepo?: MakeFileNameRepo;
  writeFileRepo?: WriteFileRepo;
  joinRepo?: JoinRepo;
}

export class CreateFile {
  public readFileRepo: ReadFileRepo;
  public makeFileNameRepo: MakeFileNameRepo;
  public joinRepo: JoinRepo;
  public writeFileRepo: WriteFileRepo;
  /* istanbul ignore next */
  constructor(args: ICreateFile = {}) {
    const {
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
    this.makeFileNameRepo = makeFileNameRepo;
    this.joinRepo = joinRepo;
    this.writeFileRepo = writeFileRepo;
  }

  async execute({
    prevPath,
    vars,
    outDir,
    file,
    number,
  }: Execute): Promise<string> {
    const fileContents = this.readFileRepo.execute(prevPath);
    const fileName = this.makeFileNameRepo.execute(file);
    // console.log("fileName:", fileName);

    const path = this.joinRepo.execute(outDir, fileName);
    const realPath = Content.replace(path, vars, number);
    const content = Content.replace(fileContents, vars, number);

    try {
      await this.writeFileRepo.execute(realPath, content);
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
