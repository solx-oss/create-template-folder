export interface Executor {
  execute: (...args: any) => any | Promise<any>;
}
