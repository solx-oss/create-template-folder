import { contentReplacer } from "../../src/helpers";

describe("contentReplacer", () => {
  it("works", () => {
    const str = "Hello there, {{world}}";
    const vars = { world: "world" };
    const str2 = "Hello there, {{world}}. How ya doin? I'm {{{name}}}";

    expect(contentReplacer(str, vars)).toBe("Hello there, world");
    expect(contentReplacer(str)).toBe(str);
    expect(contentReplacer(str2)).toBe(
      "Hello there, {{world}}. How ya doin? I'm {{{name}}}"
    );
    expect(contentReplacer(str2, { world: "monkey" })).toBe(
      "Hello there, monkey. How ya doin? I'm {{{name}}}"
    );
    expect(contentReplacer(str2, { world: "monkey" }, 3)).toBe(
      "Hello there, {{world}}. How ya doin? I'm {{{name}}}"
    );
    expect(contentReplacer(str2, { name: "monkey" }, 3)).toBe(
      "Hello there, {{world}}. How ya doin? I'm monkey"
    );
  });
});
