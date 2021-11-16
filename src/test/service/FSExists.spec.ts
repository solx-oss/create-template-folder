import { expect } from "chai";
import fs from "fs";
import { SinonStub, stub } from "sinon";
import { FSExistsRepo } from "../../utils/IO";

describe(`FSExist`, () => {
  let fsStub: SinonStub;

  beforeEach(() => {
    fsStub = stub(fs, "existsSync").returns(true);
  });

  afterEach(() => {
    fsStub.restore();
  });

  it(`gets called`, () => {
    const fsExists = new FSExistsRepo(fsStub);
    fsExists.execute("path");

    expect(fsStub.called).to.be.true;
  });
});
