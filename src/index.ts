export * from "./main";
import { createTemplateFolder } from "./main";
import { join } from "path";

(async () => {
  await createTemplateFolder(
    join(process.cwd(), "template"),
    join(process.cwd(), "trash"),
    {}
  );
})();
