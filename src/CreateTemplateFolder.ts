import { CreateFile, CreateFolder } from "./service";
import { Executor, GetAllType, ICreateTemplate } from "./types";
import { GetAllFiles, GetAllFolders, SplitSepRepo } from "./utils/IO";

interface ICreateTemplateFolder {
  splitRepo?: SplitSepRepo;
  getFilesRepo?: GetAllFiles;
  getAllFoldersRepo?: GetAllFolders;
  createFolderRepo?: CreateFolder;
  createFileRepo?: CreateFile;
}
export class CreateTemplateFolder implements Executor {
  splitRepo: SplitSepRepo;
  getFilesRepo: GetAllFiles;
  getAllFoldersRepo: GetAllFolders;
  createFolderRepo: CreateFolder;
  createFileRepo: CreateFile;
  constructor(args: ICreateTemplateFolder = {}) {
    const {
      splitRepo = new SplitSepRepo(),
      getFilesRepo = new GetAllFiles(),
      getAllFoldersRepo = new GetAllFolders(),
      createFolderRepo = new CreateFolder(),
      createFileRepo = new CreateFile(),
    } = args;
    this.splitRepo = splitRepo;
    this.getFilesRepo = getFilesRepo;
    this.getAllFoldersRepo = getAllFoldersRepo;
    this.createFolderRepo = createFolderRepo;
    this.createFileRepo = createFileRepo;
  }

  async createFolders(
    outDir: string,
    relPath: string,
    vars: Record<string, string> = {},
    number = 2
  ): Promise<void | string> {
    return this.createFolderRepo.execute(outDir, relPath, vars, number);
  }

  getAllFiles(options: GetAllType) {
    return this.getFilesRepo.execute(options);
  }

  splitOnSeperator(inDir: string) {
    return this.splitRepo.execute(inDir).slice(-1);
  }

  getAllFolders(options: GetAllType): Promise<string[]> {
    return this.getAllFoldersRepo.execute(options);
  }

  async execute({ inDir, outDir, vars = {}, number = 2 }: ICreateTemplate) {
    const [baseName] = this.splitRepo.execute(inDir).slice(-1);
    const folders = await this.getAllFoldersRepo.execute({
      base: baseName,
      dir: inDir,
    });

    await Promise.all(
      folders.map((e) => this.createFolderRepo.execute(outDir, e, vars, number))
    );

    const files = await this.getFilesRepo.execute({
      base: baseName,
      dir: inDir,
    });

    const fileNames = await Promise.all(
      files.map(([rel, file]) =>
        this.createFileRepo.execute({
          file,
          outDir,
          vars,
          prevPath: rel,
          number,
        })
      )
    );

    return fileNames;
  }
}
