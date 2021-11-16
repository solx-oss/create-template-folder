import * as fs from "fs";
import { CreateTemplateConfig, createTemplateFolderConfig } from "../../config";
import { encoding } from "../../consts";
import { Executor } from "../../types";

export class WriteFileRepo implements Executor {
  constructor(
    private config: CreateTemplateConfig = createTemplateFolderConfig
  ) {}
  async execute(realPath: string, content: string): Promise<void> {
    if (!this.config.dryRun) {
      return fs.writeFileSync(realPath, content, encoding);
    }
  }
}
