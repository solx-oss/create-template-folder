export interface CreateFileOptions {
  file: string;
  outDir: string;
  prevPath: string;
  vars: Record<string, string>;
  number: number;
}

export interface ICreateRepo {
  file(options: CreateFileOptions): Promise<string>;
  folder(
    outDir: string,
    relPath: string,
    vars?: Record<string, string>,
    number?: number
  ): Promise<void>;
}
