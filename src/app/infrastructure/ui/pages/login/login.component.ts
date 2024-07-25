import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Observable } from 'rxjs';
import { Mapper } from '../../../../core/abstractions/application/mappers/mapper.abstract';
import { LoginService } from '../../../../core/abstractions/application/services/login.interface.service';
import { NotificationService } from '../../../../core/abstractions/application/services/notification.interface.service';
import { Validator } from '../../../../core/abstractions/application/validators/validator.interface';
import { LoginFormMapper } from '../../../../core/application/mappers/login-form.mapper';
import { LoginServiceImpl } from '../../../../core/application/services/login.service';
import { NotificationServiceImpl } from '../../../../core/application/services/notification.service';
import { LoginFormValidator } from '../../../../core/application/validators/login-form.validator';
import { Response } from '../../../../core/domain/valueobjects/response.valueobject';
import { Token } from '../../../../core/domain/valueobjects/token.valueobject';
import { LoginFormDto } from '../../../dtos/login-form.dto';
import { LoginButtonComponent } from './components/login-button/login-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginButtonComponent,
    ReactiveFormsModule,
    InputTextModule,
    IconFieldModule,
    PasswordModule,
  ],
  providers: [LoginFormValidator],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isLoginButtonDisabled = false;

  constructor(
    @Inject(LoginServiceImpl)
    private _loginService: LoginService<Observable<Response<Token>>>,
    @Inject(LoginFormValidator)
    private readonly _validator: Validator<FormGroup>,
    @Inject(LoginFormMapper)
    private readonly _mapper: Mapper<FormGroup, LoginFormDto>,
    @Inject(NotificationServiceImpl)
    private _notificationService: NotificationService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public login(isValid: boolean): void {
    if (!isValid) {
      return;
    }

    const isFormValid: boolean = this._validator.validate(this.loginForm);

    if (isFormValid) {
      const requestDto: LoginFormDto = this._mapper.map(this.loginForm);

      this._loginService.login(requestDto.email, requestDto.password).subscribe({
        next: response => {
          this.handleLoginResponse(response);
        },
        error: error => {
          console.error(error);
          this._notificationService.notifyError(error.message);
        },
      });
    }
  }

  private handleLoginResponse(response: Response<Token>): void {
    localStorage.setItem('token', response.data.token);
    this._notificationService.notifySuccess(response.message!);
    this._router.navigate(['/']);
  }
}
