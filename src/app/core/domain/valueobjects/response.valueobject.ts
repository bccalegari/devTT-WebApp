export class Response<T> {
  readonly data!: T;
  readonly message?: string;
}
