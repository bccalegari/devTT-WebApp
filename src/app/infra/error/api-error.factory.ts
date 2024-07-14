import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from './api-error';

export class ApiErrorFactory {
  private static ERROR_MESSAGE = 'An error occurred, please try again later';
  private static ERROR_STATUS = 500;

  public static createApiError(error: Error): ApiError {
    return this.handleError(error);
  }

  private static handleError(error: Error): ApiError {
    if (error instanceof HttpErrorResponse) {
      return new ApiError(this.getErrorMessage(error), this.getErrorStatus(error));
    }

    return new ApiError(this.ERROR_MESSAGE, this.ERROR_STATUS);
  }

  private static getErrorMessage(error: Error): string {
    if (error instanceof HttpErrorResponse) {
      return this.handleHttpErrorMessage(error);
    }

    return this.ERROR_MESSAGE;
  }

  private static handleHttpErrorMessage(error: HttpErrorResponse): string {
    if (error.error.message) {
      return error.error.message;
    }

    return this.ERROR_MESSAGE;
  }

  private static getErrorStatus(error: Error): number {
    if (error instanceof HttpErrorResponse) {
      return error.status;
    }

    return this.ERROR_STATUS;
  }
}
