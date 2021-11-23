/* istanbul ignore file */
import glob from "glob";
import { Executor, GetAllType } from "../../types";
// @ts-ignore
import { sep, basename } from "path";

export class GetAllFiles implements Executor {
  constructor(private seperator: typeof sep = sep) {}

  get sep() {
    return this.seperator === "\\" ? "\\\\" : this.seperator;
  }

  execute({ dir, base }: GetAllType): Promise<[string, string][]> {
    return new Promise((res, rej) => {
      glob(`${dir}/**/*`, { nodir: true, dot: true }, (_err, files) => {
        if (_err) {
          return rej(_err);
        }

        const fileStruct = files.map((e) => {
          console.log(
            "e",
            e,
            "./.....",
            e.split(new RegExp(`${base}${this.sep}`)).slice(-1)[0]
          );
          return [e, e.split(new RegExp(`${base}${this.sep}`)).slice(-1)[0]];
        });

        res(fileStruct as [string, string][]);
      });
    });
  }
}
