import { splitOnSeperator } from "../../src/helpers";

describe("splitOnSep", () => {
  it("works", () => {
    const string = "/base/hello";
    expect(splitOnSeperator(string)).toEqual(["", "base", "hello"]);
  });
});
