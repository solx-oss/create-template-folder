import { expect } from "chai";
import fs from "fs";
import { SinonStub, stub } from "sinon";
import { CreateTemplateConfig } from "../../config";
import { WriteFileRepo } from "../../utils/IO";

describe(`WriteFileRepo`, () => {
  let mkdirSyncStub: SinonStub;

  beforeEach(() => {
    mkdirSyncStub = stub(fs, "writeFileSync").resolves();
  });

  afterEach(() => {
    mkdirSyncStub.restore();
  });

  it(`Doesnt call anything with dryRun flag`, async () => {
    const config = new CreateTemplateConfig(true);

    const writeFile = new WriteFileRepo(config);

    await writeFile.execute("thePath", "content");

    expect(mkdirSyncStub.called).to.be.false;
  });

  it(`Calls withhout dryRun flags`, async () => {
    const writeFile = new WriteFileRepo();

    await writeFile.execute("thePath", "content");

    expect(mkdirSyncStub.called).to.be.true;
  });
});
