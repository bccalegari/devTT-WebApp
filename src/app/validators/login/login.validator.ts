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
            messageList.push('Email is required');
        }

        if (form.controls['email'].hasError('email')) {
            messageList.push('Email is invalid');
        }

        if (form.controls['password'].invalid) {
            messageList.push('Password is required');
        }
    }

    return messageList;
  }

}