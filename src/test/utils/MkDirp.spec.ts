import { expect } from "chai";
import { SinonStub, stub } from "sinon";
import fs from "fs";
import { MkDirPRepo } from "../../utils/IO";
import { CreateTemplateConfig } from "../../config";

describe(`MkDirP`, () => {
  let mkdirFuncStub: SinonStub;
  const response = "path/template";
  beforeEach(() => {
    mkdirFuncStub = stub(fs, "mkdirSync").returns(response);
  });

  afterEach(() => {
    mkdirFuncStub.restore();
  });
  it(`Calls mkdirSync without dryRun`, () => {
    const mkdir = new MkDirPRepo();

    const result = mkdir.execute(response);
    expect(mkdirFuncStub.called).to.be.true;
    expect(result).to.be.eql(response);
  });
  it(`Doesnt call mkdirSync without dryRun`, () => {
    const config = new CreateTemplateConfig(true);
    const mkdir = new MkDirPRepo(fs.mkdirSync, config);

    const result = mkdir.execute(response);
    expect(mkdirFuncStub.called).to.be.false;
    expect(result).to.be.eql(response);
  });
});
