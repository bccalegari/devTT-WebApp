import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _messageService: MessageService) {}

  public notifySuccess(message: string): void {
    this._messageService.add({severity:'success', summary:'Success', closable: true, detail: message});
  }

  public notifyError(message: string): void {
    this._messageService.add({severity:'error', summary:'Error', closable: true, detail: message});
  }
}
