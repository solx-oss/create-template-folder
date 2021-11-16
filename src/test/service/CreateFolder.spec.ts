import { expect } from "chai";
import fs from "fs";
import { SinonStub, stub } from "sinon";
import { CreateTemplateConfig } from "../../config";
import { CreateFolder } from "../../service";
import { MkDirPRepo } from "../../utils/IO";

describe(`CreateFolder`, () => {
  let mkdirStub: SinonStub;
  let mkdirRepoStub: SinonStub;

  describe("Without spies", () => {
    beforeEach(() => {
      mkdirStub = stub(fs, "mkdirSync");
    });

    afterEach(() => {
      mkdirStub.restore();
    });

    it(`All works`, async () => {
      //   const mkdirRepo = new MkDirPRepo();
      const createFolder = new CreateFolder();

      await createFolder.execute("outDir", "relPath", {}, 2);
      expect(mkdirStub.called).to.be.true;
      expect(mkdirStub.calledOnce).to.be.true;

      expect(1).to.be.eq(1);
    });
  });
  describe("With spies", () => {
    beforeEach(() => {
      mkdirStub = stub(fs, "mkdirSync");
    });

    afterEach(() => {
      mkdirStub.restore();
      mkdirRepoStub?.restore?.();
    });

    it(`All `, async () => {
      //   const mkdirRepo = new MkDirPRepo();
      const createFolder = new CreateFolder({
        config: new CreateTemplateConfig(true),
      });

      await createFolder.execute("outDir", "relPath", {}, 2);
      expect(mkdirStub.called).to.be.false;
      expect(mkdirStub.calledOnce).to.be.false;
    });

    it(`EXECUTE Gets Stubbed`, async () => {
      const mkdirRepo = new MkDirPRepo();
      mkdirRepoStub = stub(mkdirRepo, "execute");
      const createFolder = new CreateFolder({
        config: new CreateTemplateConfig(true),
        mkdirRepo,
      });

      await createFolder.execute("outDir", "relPath", {}, 2);
      expect(mkdirRepoStub.called).to.be.false;
      expect(mkdirRepoStub.calledOnce).to.be.false;
    });
    it(`EXECUTE Gets Stubbed`, async () => {
      const mkdirRepo = new MkDirPRepo();
      mkdirRepoStub = stub(mkdirRepo, "execute");
      const createFolder = new CreateFolder({
        config: new CreateTemplateConfig(false),
        mkdirRepo,
      });

      await createFolder.execute("outDir", "relPath", {}, 2);
      expect(mkdirRepoStub.called).to.be.true;
      expect(mkdirRepoStub.calledOnce).to.be.true;
    });
  });
});
