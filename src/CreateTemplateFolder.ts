import { CreateService } from "./service";
import { GetAllService } from "./service/GetAllService.service";
import { Executor, ICreateRepo, ICreateTemplate, IFsOperations } from "./types";
import { IPathRepo } from "./types/PathRepo.interface";
import { FsOperations, PathRepo } from "./utils/IO";

interface ICreateTemplateFolder {
  fsOpsRepo?: IFsOperations;
  getAllService?: GetAllService;
  pathRepo?: IPathRepo;
  createRepo?: ICreateRepo;
}
export class CreateTemplateFolder implements Executor {
  fsOpsRepo: IFsOperations;
  getAllService: GetAllService;
  pathRepo: IPathRepo;
  createRepo: ICreateRepo;

  constructor(args: ICreateTemplateFolder = {}) {
    const {
      fsOpsRepo = new FsOperations(),
      getAllService = new GetAllService(),
      pathRepo = new PathRepo(),
      createRepo = new CreateService(),
    } = args;
    this.fsOpsRepo = fsOpsRepo;
    this.getAllService = getAllService;
    this.pathRepo = pathRepo;
    this.createRepo = createRepo;
  }

  async execute({ inDir, outDir, vars = {}, number = 2 }: ICreateTemplate) {
    const [baseName] = inDir.split(this.pathRepo.sep).slice(-1);

    const folders = await this.getAllService.folders(inDir, baseName);

    await Promise.all(
      folders.map((e) => this.createRepo.folder(outDir, e, vars, number))
    );

    const files = await this.getAllService.files(inDir, baseName);

    const fileNames = await Promise.all(
      files.map(([rel, file]) =>
        this.createRepo.file({
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
