export class ApiError implements Error {
  name: string;
  message: string;
  status: number;

  public constructor(message: string, status: number) {
    this.name = 'ApiError';
    this.message = message;
    this.status = status;
  }
}
