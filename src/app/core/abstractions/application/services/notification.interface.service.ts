export interface NotificationService {
  notifySuccess(message: string): void;
  notifyError(message: string): void;
  notifyDefaultError(): void;
}
