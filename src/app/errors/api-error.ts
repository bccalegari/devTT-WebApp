export class ApiError implements Error {
    name: string;
    message: string;
    public constructor(message: string) {
        this.name = 'ApiError';
        this.message = message;
    }
}