import { expect } from "chai";
// @ts-ignore
import fs from "fs";
import { describe } from "mocha";
import { join } from "path";
import sinon, { SinonStub } from "sinon";
import { CreateFile } from "../../service";
import { CreateTemplateConfig } from "../../config";
import { JoinRepo, ReadFileRepo, WriteFileRepo } from "../../utils/IO";

describe(`CreateFile`, () => {
  let config: CreateTemplateConfig;
  let joinRepo: JoinRepo;
  let readFileRepo: ReadFileRepo;
  let writeFileRepo: WriteFileRepo;
  const outDir = "outDir";
  const file = "file.txt";
  const content = `content`;
  const prevPath = "here/there";
  let joinSpy: SinonStub;
  let readFileSpy: SinonStub;
  let writeFileSpy: SinonStub;

  beforeEach(() => {
    config = new CreateTemplateConfig(true);
    joinRepo = new JoinRepo();
    readFileRepo = new ReadFileRepo();
    writeFileRepo = new WriteFileRepo();
    content;
  });

  describe(`Config is Dry Run`, () => {
    beforeEach(() => {
      joinSpy = sinon.stub(joinRepo, "execute").returns(`${outDir}/${file}`);
      readFileSpy = sinon.stub(readFileRepo, "execute").resolves(content);
      writeFileSpy = sinon.stub(writeFileRepo, "execute");
    });

    afterEach(() => {
      joinSpy.restore();
      readFileSpy.restore();
      writeFileSpy.restore();
    });

    after(() => {
      readFileSpy?.restore?.();
    });
    it(`Performs all, but the copy`, async () => {
      const createFileCommand = new CreateFile({
        joinRepo,
        readFileRepo,
        writeFileRepo,
        config,
      });
      const execution = await createFileCommand.execute({
        vars: {},
        file,
        number: 2,
        outDir,
        prevPath,
      });
      expect(joinSpy.getCall(0).args).to.deep.equal([outDir, file]);
      expect(joinSpy.callCount).to.eq(1);
      expect(readFileSpy.callCount).to.eq(1);
      expect(writeFileSpy.callCount).to.eq(0);
      expect(execution).to.be.string;
    });
  });

  describe(`Config when Dry Run Off`, () => {
    beforeEach(() => {
      joinSpy = sinon.stub(joinRepo, "execute").returns(`${outDir}/${file}`);
      readFileSpy = sinon.stub(readFileRepo, "execute").resolves(content);
      writeFileSpy = sinon.stub(writeFileRepo, "execute");
    });

    afterEach(() => {
      joinSpy.restore();
      readFileSpy.restore();
      writeFileSpy.restore();
    });

    after(() => {
      readFileSpy?.restore?.();
    });

    it(`Does everything it should but calls write files when in dev mode`, async () => {
      const createFileCommand = new CreateFile({
        joinRepo,
        readFileRepo,
        writeFileRepo,
        config: new CreateTemplateConfig(false),
      });
      const execution = await createFileCommand.execute({
        vars: {},
        file,
        number: 2,
        outDir,
        prevPath,
      });
      expect(joinSpy.callCount).to.eq(1);
      expect(readFileSpy.callCount).to.eq(1);
      expect(writeFileSpy.callCount).to.eq(1);
      expect(typeof execution).to.be.string;
      expect(writeFileSpy.getCall(0).args).to.deep.equal([
        `${outDir}/${file}`,
        content,
      ]);
    });
  });

  describe(`FS Interactions`, () => {
    describe(`Success`, () => {
      beforeEach(() => {
        readFileSpy = sinon.stub(fs, "readFileSync").resolves("cool");
        writeFileSpy = sinon.stub(fs, "writeFileSync").resolves();
      });

      afterEach(() => {
        readFileSpy.restore();
        writeFileSpy.restore();
      });

      it(`Calls fs modules`, async () => {
        const readRepo = new ReadFileRepo();
        const writeFile = new WriteFileRepo();

        const createFileCommand = new CreateFile({
          joinRepo,
          readFileRepo: readRepo,
          writeFileRepo: writeFile,
          // writeFileRepo: writeRepo,
          config: new CreateTemplateConfig(false),
        });

        const execution = await createFileCommand.execute({
          vars: {},
          file: join(__dirname, "createFile.spec.ts"),
          number: 2,
          outDir: ".",
          prevPath,
          //
        });

        expect(readFileSpy.callCount).to.eq(1);
        expect(writeFileSpy.callCount).to.eq(1);

        expect(execution).to.be.string;
      });
    });
  });
});
