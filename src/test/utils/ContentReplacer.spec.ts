import { expect } from "chai";
import { test } from "mocha";
import { Content } from "../../utils";

describe(`ContentReplacer`, () => {
  test(`Replace`, () => {
    const str = `Hello {{sentence}}`;
    const vars = { sentence: "world" };

    const replaced = Content.replace(str, vars);

    expect(replaced).to.eql(`Hello ${vars.sentence}`);
  });

  test(`Replace without other arguments`, () => {
    const str = `Hello {{sentence}}`;

    const replaced = Content.replace(str);

    expect(replaced).to.eql(str);
  });
  test(`Replace without other arguments and 3 args`, () => {
    const str = `Hello {{ sentence }}`;

    const replaced = Content.replace(str, {}, 3);

    expect(replaced).to.eql(str);

    expect(
      Content.replace(`Hello {{{sentence   }}}`, { sentence: "world" }, 3)
    ).to.eql(`Hello world`);
  });
});
