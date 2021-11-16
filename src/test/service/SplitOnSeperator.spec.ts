import { expect } from "chai";
import { SplitSepRepo } from "../../utils/IO";

describe(`SplitOnSeperator`, () => {
  it(`Works`, () => {
    const seperator = "/";
    const splitRepo = new SplitSepRepo(seperator);

    const str = "path/to/world";

    const split = splitRepo.execute(str);

    expect(split).to.deep.equals(str.split(seperator));
    // expect(spyStrSplit.getCall(0).args)
  });
});
