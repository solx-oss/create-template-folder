import { copyTemplate } from "../src";
import fs from "fs-extra";
import * as path from "path";
import {
  noInitialValue,
  noOutDir,
  noSuchThing,
  notEnoughCurlies,
} from "../src/errors";
import { fsExists } from "../src/helpers";
import { fsEncoding } from "../src/consts";

const template = path.join(__dirname, "..", "template");
const exit = path.join(__dirname, "exit");

afterAll(async () => {
  const exitFolder = path.join(__dirname, "..", "out");
  if (await fsExists(exitFolder ?? exit)) {
    fs.remove(exitFolder ?? exit);
  }
});

describe("copyTemplate", () => {
  describe("error states", () => {
    beforeEach(() => {
      jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(async () => {
      //  @ts-ignore
      console.log.mockClear();
      if (await fsExists(exit)) {
        fs.remove(exit);
      }
    });

    afterAll(() => {
      //  @ts-ignore
      console.log.mockRestore();
    });

    it("in case of no args", async () => {
      // @ts-expect-error
      await expect(copyTemplate()).rejects.toThrow(noInitialValue);
    });

    it("fails when no inDir", async () => {
      //  @ts-expect-error
      await expect(copyTemplate("hello")).rejects.toThrow(noSuchThing);

      //  @ts-expect-error
      await expect(copyTemplate({ inDir: "hello" })).rejects.toThrow(
        noSuchThing
      );
    });

    it("fails when no outDir", async () => {
      //  @ts-expect-error
      await expect(copyTemplate(template)).rejects.toThrow(noOutDir);
      //  @ts-expect-error
      await expect(copyTemplate({ inDir: template })).rejects.toThrow(noOutDir);
    });

    it("fails when smaller number", async () => {
      await expect(
        copyTemplate({
          inDir: template,
          outDir: exit,
          vars: {},
          number: 1,
        })
      ).rejects.toThrow(notEnoughCurlies);

      await expect(copyTemplate(template, exit, {}, 1)).rejects.toThrow(
        notEnoughCurlies
      );
    });
  });

  describe("success", () => {
    let exitFolder: string;
    beforeEach(() => {
      jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(async () => {
      //  @ts-ignore
      console.log.mockClear();
      if (await fsExists(exitFolder ?? exit)) {
        fs.remove(exitFolder ?? exit);
      }
    });

    afterAll(() => {
      //  @ts-ignore
      console.log.mockRestore();
    });

    it("passed simple with string", async () => {
      const newTmp = path.join(template, "newTmp");
      const newFile = path.join(newTmp, "index.js");
      exitFolder = path.join(__dirname, "..", "hello");
      const anExitFolder = path.join(exitFolder, "newTmp");

      await fs.mkdirp(newTmp);
      await fs.writeFile(newFile, "{{hello}}", fsEncoding);
      await fs.readFile(newFile, fsEncoding);
      await copyTemplate(newTmp, anExitFolder, { hello: "andre" });
      const data = await fs.readFile(
        path.join(anExitFolder, "index.js"),
        fsEncoding
      );
      expect(data).toBe("andre");
    });
    it("passed simple with object format", async () => {
      const newTmp = path.join(template, "newTmp");
      const newFile = path.join(newTmp, "index.js");
      exitFolder = path.join(__dirname, "..", "hello");
      const anExitFolder = path.join(exitFolder, "newTmp");
      await fs.mkdir(exitFolder, { recursive: true });
      await fs.mkdirp(newTmp);
      await fs.writeFile(newFile, "{{hello}}", fsEncoding);
      await fs.readFile(newFile, fsEncoding);
      // await copyTemplate(newTmp, anExitFolder, { hello: "andre" });
      await copyTemplate({
        inDir: newTmp,
        outDir: anExitFolder,
        vars: { hello: "andre" },
      });
      const data = await fs.readFile(
        path.join(anExitFolder, "index.js"),
        fsEncoding
      );
      expect(data).toBe("andre");
    });
    it("passed simple wihout args", async () => {
      const newTmp = path.join(template, "newTmp");
      const newFile = path.join(newTmp, "index.js");
      exitFolder = path.join(__dirname, "..", "hello");
      const anExitFolder = path.join(exitFolder, "newTmp");

      await fs.mkdirp(newTmp);
      await fs.writeFile(newFile, "{{hello}}", fsEncoding);
      await fs.readFile(newFile, fsEncoding);
      // await copyTemplate(newTmp, anExitFolder, { hello: "andre" });
      await copyTemplate({
        inDir: newTmp,
        outDir: anExitFolder,
        vars: {},
      });
      const data = await fs.readFile(
        path.join(anExitFolder, "index.js"),
        fsEncoding
      );
      expect(data).toBe("{{hello}}");
    });
  });
});
