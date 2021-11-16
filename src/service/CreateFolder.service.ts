import { CreateTemplateConfig, createTemplateFolderConfig } from "../config";
import { Executor } from "../types";
import { Content } from "../utils";
import { JoinRepo, MkDirPRepo } from "../utils/IO";

interface ICreateFolder {
  joinRepo?: JoinRepo;
  mkdirRepo?: MkDirPRepo;
  config?: CreateTemplateConfig;
}

export class CreateFolder implements Executor, ICreateFolder {
  joinRepo: JoinRepo;
  mkdirRepo: MkDirPRepo;
  config: CreateTemplateConfig;

  /* istanbul ignore next */
  constructor(args: ICreateFolder = {}) {
    const {
      /* istanbul ignore next */
      config = createTemplateFolderConfig,
      mkdirRepo = new MkDirPRepo(),
      joinRepo = new JoinRepo(),
    } = args;

    this.config = config;
    this.joinRepo = joinRepo;
    this.mkdirRepo = mkdirRepo;
  }

  async execute(
    outDir: string,
    relPath: string,
    /* istanbul ignore next */
    vars: Record<string, string> = {},
    /* istanbul ignore next */
    number: number = 2
  ) {
    const path = this.joinRepo.execute(outDir, relPath);

    const realPaths = Content.replace(path, vars, number);

    if (!this.config.dryRun) {
      this.mkdirRepo.execute(realPaths);
    }
  }
}
