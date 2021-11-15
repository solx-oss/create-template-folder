import glob from "glob";
import { Executor, GetAllType } from "../../types";

export class GetAllFolders implements Executor {
  execute(options: GetAllType): Promise<string[]> {
    const { base, dir } = options;
    return new Promise((res, _rej) => {
      glob(`${dir}/**/`, {}, (_err, folders) => {
        // if (err) {
        //   rej(err);
        // }
        const cleanStruct = folders.map((e) => e.split(base).slice(-1)[0]);

        res(cleanStruct);
      });
    });
  }
}
