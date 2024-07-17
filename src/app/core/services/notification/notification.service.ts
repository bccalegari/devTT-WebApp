import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from './notification.interface.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceImpl implements NotificationService {
  private static readonly _DEFAULT_ERROR_MESSAGE =
    'Um erro inesperado ocorreu. Por favor, tente novamente mais tarde.';

  public constructor(private readonly _messageService: MessageService) {}

  public notifySuccess(message: string): void {
    this._messageService.add({
      severity: 'success',
      closable: true,
      detail: message,
    });
  }

  public notifyError(message: string): void {
    this._messageService.add({
      severity: 'error',
      closable: true,
      detail: message,
    });
  }

  public notifyDefaultError(): void {
    this.notifyError(NotificationServiceImpl._DEFAULT_ERROR_MESSAGE);
  }
}
