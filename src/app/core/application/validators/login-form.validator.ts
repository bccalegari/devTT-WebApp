import { Inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../../abstractions/application/services/notification.interface.service';
import { Validator } from '../../abstractions/application/validators/validator.interface';
import { NotificationServiceImpl } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LoginFormValidator implements Validator<FormGroup> {
  constructor(
    @Inject(NotificationServiceImpl)
    private readonly _notificationService: NotificationService,
  ) {}

  public validate(form: FormGroup): boolean {
    const messageList: string[] = this.validateFields(form);

    if (messageList.length === 0) {
      return true;
    }

    messageList.forEach(message => {
      this._notificationService.notifyError(message);
    });

    return false;
  }

  private validateFields(form: FormGroup): string[] {
    const messageList: string[] = [];

    if (form.controls['email'].hasError('required')) {
      messageList.push('O campo email é obrigatório');
    }

    if (form.controls['email'].hasError('email')) {
      messageList.push('Email inválido');
    }

    if (form.controls['password'].invalid) {
      messageList.push('O campo senha é obrigatório');
    }

    return messageList;
  }
}
