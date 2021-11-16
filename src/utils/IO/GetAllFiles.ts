/* istanbul ignore file */
import glob from "glob";
import { Executor, GetAllType } from "../../types";

export class GetAllFiles implements Executor {
  execute({ dir, base }: GetAllType): Promise<[string, string][]> {
    return new Promise((res, rej) => {
      glob(`${dir}/**/*`, { nodir: true, dot: true }, (_err, files) => {
        if (_err) {
          return rej(_err);
        }

        const fileStruct = files.map((e) => [e, e.split(base).slice(-1)[0]]);

        res(fileStruct as [string, string][]);
      });
    });
  }
}