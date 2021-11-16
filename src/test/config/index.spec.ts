import { expect } from "chai";
import { spy } from "sinon";
import { CreateTemplateConfig } from "../../config";

describe(`Create Template Config`, () => {
  it(`Works`, () => {
    const config = new CreateTemplateConfig();
    const initStub = spy(config, "init");

    config.init(true);

    expect(initStub.called).to.be.true;
  });
});
