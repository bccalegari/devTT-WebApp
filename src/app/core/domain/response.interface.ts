export interface Response<T> {
  readonly data: T;
  readonly message?: string;
}
