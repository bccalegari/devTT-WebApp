import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../../../../core/services/notification/notification.interface.service';
import { NotificationServiceImpl } from '../../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [ButtonModule],
  providers: [NotificationServiceImpl],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginButtonComponent implements OnInit, OnDestroy {
  public isLoginButtonDisabled = false;
  private _clickCount = 0;
  private readonly _maxClicks: number = 5;
  private readonly _resetInterval: number = 60000; // 1 minute
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _timerFn: any;
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(
    @Inject(NotificationServiceImpl)
    private readonly _notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this.startTimer();
  }

  public validateMaxClicks(): void {
    const reachedMaxClicks: boolean = this.isLoginButtonReachedMaxClicks();
    if (reachedMaxClicks) {
      this.handleLoginButton();
      this.isValid.emit(false);
      return;
    }
    this.isValid.emit(true);
  }

  private handleLoginButton(): void {
    this._notificationService.notifyError(
      'Você atingiu o limite de tentativas de login. Aguarde 1 minuto para tentar novamente.',
    );
    this.disableLoginButton();
  }

  private isLoginButtonReachedMaxClicks(): boolean {
    const reachedMaxClicks: boolean = this._clickCount >= this._maxClicks;
    this._clickCount++;
    return reachedMaxClicks;
  }

  public disableLoginButton() {
    this.isLoginButtonDisabled = true;
  }

  private startTimer(): void {
    this._timerFn = setInterval(() => {
      this._clickCount = 0;
      this.isLoginButtonDisabled = false;
    }, this._resetInterval);
  }

  public ngOnDestroy(): void {
    clearInterval(this._timerFn);
  }
}
