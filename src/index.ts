export * from "./main";
import { copyTemplate } from "./main";
import * as path from "path";

(async () => {
  copyTemplate({
    inDir: path.join(__dirname, "..", "template", "newTmp"),
    outDir: path.join(__dirname, "..", "newTmp"),
    vars: { hello: "andre" },
  });
})();
