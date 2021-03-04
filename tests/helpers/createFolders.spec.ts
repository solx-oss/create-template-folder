import { createFolders } from "../../src/helpers/createFolders";

jest.mock("fs-extra");
describe.only("createFolders", () => {
  it("works", async () => {
    await createFolders("string", "out");
  });
});
