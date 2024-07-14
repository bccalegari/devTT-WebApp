import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { Observable } from 'rxjs';
import { LoggedUserInfo } from '../../../core/domain/logged-user-info.interface';
import { AuthService } from '../../../core/services/auth/auth.interface.service';
import { AuthServiceImpl } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/notification/notification.interface.service';
import { NotificationServiceImpl } from '../../../core/services/notification/notification.service';
import { LoggedUserInfoService } from '../../../core/services/user/logged-user-info.interface.service';
import { LoggedUserInfoServiceImpl } from '../../../core/services/user/logged-user-info.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { WelcomeCardComponent } from './components/welcome-card/welcome-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    WelcomeCardComponent,
    KpiCardComponent,
    CardModule,
    ChartModule,
    DividerModule,
  ],
  providers: [NotificationServiceImpl],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public userName!: string;
  public userRole!: string;
  public data!: object;
  public options!: object;
  public dataBar!: object;
  public optionsBar!: object;

  public constructor(
    @Inject(LoggedUserInfoServiceImpl)
    private _loggedUserInfoService: LoggedUserInfoService<Observable<LoggedUserInfo>>,
    @Inject(AuthServiceImpl) private _authService: AuthService,
    @Inject(NotificationServiceImpl)
    private _notificationService: NotificationService,
  ) {}

  public ngOnInit(): void {
    this._getLoggedUserInfo();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Novas Empresas',
          data: [65, 59, 80, 81, 56, 55, 40, 30, 55, 102, 81, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
          tension: 0.4,
        },
        {
          label: 'Novos Funcionários',
          data: [28, 48, 40, 19, 86, 27, 90, 80, 70, 60, 90, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4,
        },
      ],
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    const documentStyleBar = getComputedStyle(document.documentElement);
    const textColorBar = documentStyleBar.getPropertyValue('--text-color');
    const whiteColor = documentStyleBar.getPropertyValue('--white');

    this.dataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Funcionários',
          backgroundColor: documentStyleBar.getPropertyValue('--blue-500'),
          borderColor: documentStyleBar.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          label: 'Horas Registradas',
          backgroundColor: documentStyleBar.getPropertyValue('--pink-500'),
          borderColor: documentStyleBar.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90],
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };

    this.optionsBar = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColorBar,
            usePointStyle: true,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: whiteColor,
          },
          grid: {
            color: whiteColor,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: whiteColor,
          },
          grid: {
            color: whiteColor,
            drawBorder: false,
          },
        },
      },
    };
  }

  private _getLoggedUserInfo(): void {
    this._loggedUserInfoService.getInfo().subscribe({
      next: userInfo => {
        this.userName = userInfo.name;
        this.userRole = userInfo.role;
      },
      error: error => {
        this._notificationService.notifyError(error.message);
        this._authService.logout();
      },
    });
  }
}
