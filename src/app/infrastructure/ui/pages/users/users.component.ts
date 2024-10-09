import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Mapper } from '../../../../core/abstractions/application/mappers/mapper.abstract';
import { AuthService } from '../../../../core/abstractions/application/services/auth.interface.service';
import { NotificationService } from '../../../../core/abstractions/application/services/notification.interface.service';
import { LoggedUserMapper } from '../../../../core/application/mappers/logged-user.mapper';
import { AuthServiceImpl } from '../../../../core/application/services/auth.service';
import { NotificationServiceImpl } from '../../../../core/application/services/notification.service';
import { User } from '../../../../core/domain/entities/user.entity';
import { LoggedUserJwtPayloadDto } from '../../../dtos/logged-user-jwt-payload.dto';
import { LoggedLayoutComponent } from '../../shared/pages/logged-layout/logged-layout.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LoggedLayoutComponent,
    TableModule,
    TagModule,
    ButtonGroupModule,
    ButtonModule,
    PaginatorModule,
  ],
  providers: [NotificationServiceImpl],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit {
  public loggedUser!: User;
  public data = [
    { name: 'John Doe', role: 'Admin' },
    { name: 'Jane Doe', role: 'User' },
    { name: 'Alice', role: 'User' },
    { name: 'Bob', role: 'User' },
  ];

  public constructor(
    @Inject(AuthServiceImpl) private _authService: AuthService,
    @Inject(NotificationServiceImpl) private _notificationService: NotificationService,
    @Inject(LoggedUserMapper)
    private readonly _loggedUserInfoMapper: Mapper<LoggedUserJwtPayloadDto, User>,
  ) {}

  public ngOnInit(): void {
    this._getLoggedUser();
  }

  private _getLoggedUser(): void {
    this._authService.getLoggedUser().subscribe({
      next: user => {
        this.loggedUser = this._loggedUserInfoMapper.map(user);
      },
      error: error => {
        console.error(error);
        this._notificationService.notifyDefaultError();
      },
    });
  }
}
