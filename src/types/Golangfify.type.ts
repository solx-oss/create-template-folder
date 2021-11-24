export type Errorable = Error | null;
export type Golangify<T> = [T, Errorable?];
export type MaybeError = void | undefined | Errorable;
