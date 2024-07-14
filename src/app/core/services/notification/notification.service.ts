import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotificationService } from './notification.interface.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceImpl implements NotificationService {
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
}
