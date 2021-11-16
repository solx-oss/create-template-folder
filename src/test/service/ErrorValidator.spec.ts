import { expect } from "chai";
import { stub } from "sinon";
import {
  directoryNotEmpty,
  noOutDir,
  noSuchThing,
  notEnoughCurlies,
} from "../../consts";
import { ObjectErrorValidator } from "../../service";
import { FSExistsRepo } from "../../utils/IO";

describe(`Error validator`, () => {
  it(`When file exists`, () => {
    const fsRepo = new FSExistsRepo();
    stub(fsRepo, "execute").returns(true);

    const objectValid = new ObjectErrorValidator(fsRepo);

    const value = objectValid.execute({
      inDir: "directory",
      outDir: "",
      vars: {},
    });

    expect(value).to.be.string(noOutDir);
  });

  it(`No Correct Dir`, () => {
    const fsRepo = new FSExistsRepo();
    stub(fsRepo, "execute").returns(false);

    const objectValid = new ObjectErrorValidator(fsRepo);

    const value = objectValid.execute({
      inDir: "directory",
      outDir: "",
      vars: {},
    });

    expect(value).to.be.string(noSuchThing);
  });
  it(`OutDir Taken`, () => {
    const fsRepo = new FSExistsRepo();
    stub(fsRepo, "execute").returns(true);

    const objectValid = new ObjectErrorValidator(fsRepo);

    const value = objectValid.execute({
      inDir: "directory",
      outDir: "directory",
      vars: {},
    });

    expect(value).to.be.string(directoryNotEmpty);
  });

  it(`Not enough curlies`, () => {
    const objectValid = new ObjectErrorValidator();

    stub(objectValid, "noInDir").returns(false);
    stub(objectValid, "outDirExists").returns(false);

    const value = objectValid.execute({
      inDir: "directory",
      outDir: "directory",
      vars: {},
      number: 1,
    });

    expect(value).to.be.string(notEnoughCurlies);
  });
  it(`All good`, () => {
    const objectValid = new ObjectErrorValidator();

    stub(objectValid, "noInDir").returns(false);
    stub(objectValid, "outDirExists").returns(false);

    const value = objectValid.execute({
      inDir: "directory",
      outDir: "directory",
      vars: {},
      number: 3,
    });

    expect(value).to.be.false;
  });
});
