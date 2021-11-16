export class CreateTemplateConfig {
  constructor(private _dryRun: boolean = false) {}

  init(newDryRun: boolean) {
    this._dryRun = newDryRun;
  }

  get dryRun() {
    return this._dryRun;
  }
}

export const createTemplateFolderConfig = new CreateTemplateConfig();
