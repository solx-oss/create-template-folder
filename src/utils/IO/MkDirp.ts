import { mkdirSync } from "fs";
import { CreateTemplateConfig, createTemplateFolderConfig } from "../../config";
import { Executor } from "../../types";

export class MkDirPRepo implements Executor {
  constructor(
    private mkdirpFunc: typeof mkdirSync = mkdirSync,
    private config: CreateTemplateConfig = createTemplateFolderConfig
  ) {}
  execute(thePath: string) {
    if (!this.config.dryRun) {
      return this.mkdirpFunc(thePath, { recursive: true });
    }
    return thePath;
  }
}
