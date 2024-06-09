import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginValidator {

  constructor() {}

  public validate(form: FormGroup): string[] {
    const messageList: string[] = [];

    if (form.invalid) {
        if (form.controls['email'].hasError('required')) {
            messageList.push('O campo email é obrigatório');
        }

        if (form.controls['email'].hasError('email')) {
            messageList.push('Email inválido');
        }

        if (form.controls['password'].invalid) {
            messageList.push('O campo senha é obrigatório');
        }
    }

    return messageList;
  }

}