import { HttpErrorResponse } from "@angular/common/http";
import { ApiError } from "./api-error";

export class ApiErrorFactory {
    private static ERROR_MESSAGE: string = 'An error occurred, please try again later';

    public static createApiError(error: Error): ApiError {
        return new ApiError(this.handleError(error));
    }

    private static handleError(error: Error): string {
        if (error instanceof HttpErrorResponse) {
            return this.handleHttpError(error);
        }

        return this.ERROR_MESSAGE;
    }

    private static handleHttpError(error: HttpErrorResponse): string {
        if (error.error.message) {
            return error.error.message;
        }

        return this.ERROR_MESSAGE;
    }
}