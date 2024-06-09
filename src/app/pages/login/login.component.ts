import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { LoginService } from '../../services/login/login.service';
import { LoginValidator } from '../../validators/login/login.validator';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule, PasswordModule, IconFieldModule, InputIconModule, ButtonModule, ToastModule, ReactiveFormsModule, FormsModule
  ],
  providers: [NotificationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoginButtonDisabled: boolean = false;
  private clickCount: number = 0;
  private maxClicks: number = 5;
  private resetInterval: number = 60000 // 1 minute
  private timerFn: any;
  
  constructor(
    private loginService: LoginService,
    private loginValidator: LoginValidator,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.buildForm();
    this.startTimer();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  private startTimer(): void {
    this.timerFn = setInterval(() => {
      this.clickCount = 0;
      this.isLoginButtonDisabled = false;
    }, this.resetInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerFn);
  }

  public login(): void {
    const isValid = this.validate();
    this.handleLoginButton();

    if(isValid) {
      const { email, password } = this.loginForm.value;

      this.loginService.login(email, password).subscribe({
        next: (response) => {
          this.notificationService.notifySuccess(response.message!);
        },
        error: (error) => {
          this.notificationService.notifyError(error.message);
        }
      });
    }
  }

  private handleLoginButton(): void {
    if (this.isLoginButtonReachedMaxClicks()) {
      this.notificationService.notifyError('Você atingiu o limite de tentativas de login. Aguarde 1 minuto para tentar novamente.');
      this.disableLoginButton();
      return;
    }
    
    this.clickCount++;
  }

  private isLoginButtonReachedMaxClicks(): boolean {
    return this.clickCount >= this.maxClicks;
  }

  public disableLoginButton() {
    this.isLoginButtonDisabled = true;
  }

  private validate(): boolean {
    const messageList: string[] = this.loginValidator.validate(this.loginForm);

    if (messageList.length === 0) {
      return true;
    }

    messageList.forEach(message => {
      this.notificationService.notifyError(message);
    });

    return false;
  }

}