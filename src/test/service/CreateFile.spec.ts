import { expect } from "chai";
// @ts-ignore
import fs from "fs";
import { describe } from "mocha";
import { join } from "path";
import sinon, { SinonStub } from "sinon";
import { CreateTemplateConfig } from "../../config";
import { encoding } from "../../consts";
import { CreateFile } from "../../service";
import { JoinRepo, ReadFileRepo, WriteFileRepo } from "../../utils/IO";

const outDir = "outDir";
describe(`CreateFile`, () => {
  let config: CreateTemplateConfig;
  let joinRepo: JoinRepo;
  let readFileRepo: ReadFileRepo;
  let writeFileRepo: WriteFileRepo;
  const file = "file.txt";
  const content = `content`;
  const prevPath = "here/there";
  let joinSpy: SinonStub;
  let readFileSpy: SinonStub;
  let writeFileSpy: SinonStub;
  let readFile: SinonStub;

  beforeEach(() => {
    config = new CreateTemplateConfig(true);
    joinRepo = new JoinRepo();
    readFileRepo = new ReadFileRepo();
    writeFileRepo = new WriteFileRepo();
  });

  describe(`Config is Dry Run`, () => {
    beforeEach(() => {
      joinSpy = sinon.stub(joinRepo, "execute").returns(`${outDir}/${file}`);
      readFileSpy = sinon.stub(readFileRepo, "execute").returns(content);
      writeFileSpy = sinon.stub(writeFileRepo, "execute");
      readFile = sinon.stub(fs, "readFileSync").returns(`${outDir}/${file}`);
    });

    afterEach(() => {
      joinSpy.restore();
      readFileSpy.restore();
      writeFileSpy.restore();
      readFileSpy?.restore?.();
      readFile.restore();
    });

    after(() => {
      readFileSpy?.restore?.();
    });

    it(`Performs all, but the copy`, async () => {
      const createFileCommand = new CreateFile({
        joinRepo,
        readFileRepo: new ReadFileRepo(readFile as typeof fs.readFileSync),
        writeFileRepo,
        config,
      });
      // @ts-ignore
      const execution = await createFileCommand.execute({
        vars: {},
        file,
        number: 2,
        outDir,
        prevPath,
      });
      const { args } = readFile.getCall(0);
      expect(args[0]).to.eql(prevPath);
      expect(args[1]).to.deep.equal(encoding);
      expect(readFile.called).to.be.true;
      // expect(joinSpy.getCall(0).args).to.deep.equal([outDir, file]);
      // expect(joinSpy.callCount).to.eq(1);
      // expect(readFileSpy.callCount).to.eq(1);
      // expect(w/riteFileSpy.callCount).to.eq(0);
      expect(execution).to.be.string;
    });
  });

  describe(`Config when Dry Run Off`, () => {
    beforeEach(() => {
      joinSpy = sinon.stub(joinRepo, "execute").returns(`${outDir}/${file}`);
      readFileSpy = sinon.stub(readFileRepo, "execute").returns(content);
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
