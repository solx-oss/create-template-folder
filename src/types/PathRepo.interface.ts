export interface IPathRepo {
  sep: string;
  join(...paths: string[]): string;
}
