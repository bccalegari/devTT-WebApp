import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginForm } from '../../../../core/domain/login-form.interface';
import { Mapper } from '../mapper.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginFormMapper implements Mapper<FormGroup, LoginForm> {
  public map(form: FormGroup): LoginForm {
    return {
      email: form.get('email')?.value,
      password: form.get('password')?.value,
    };
  }
}
