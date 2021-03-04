import glob from "glob";

type GetAllType = {
  base: string;
  dir: string;
};

export async function getAllFiles(
  options: GetAllType
): Promise<[string, string][]> {
  const { dir, base } = options;
  return new Promise((res, _rej) => {
    glob(`${dir}/**/*`, { nodir: true, dot: true }, (_err, files) => {
      // if (err) {
      //   rej(err);
      // }
      const fileStruct = files.map((e) => [e, e.split(base).slice(-1)[0]]);

      res(fileStruct as [string, string][]);
    });
  });
}

export async function getAllFolders(options: GetAllType): Promise<string[]> {
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
