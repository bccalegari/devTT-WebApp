import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { User } from '../../../core/domain/user.entity';
import { AuthService } from '../../../core/services/auth/auth.interface.service';
import { AuthServiceImpl } from '../../../core/services/auth/auth.service';
import { NotificationService } from '../../../core/services/notification/notification.interface.service';
import { NotificationServiceImpl } from '../../../core/services/notification/notification.service';
import { LoggedUserJwtPayloadDto } from '../../../infra/dtos/logged-user-jwt-payload.dto';
import { Mapper } from '../../../infra/mappers/mapper.abstract';
import { LoggedUserMapper } from '../../../infra/mappers/user/logged-user.mapper';
import { CentralContainerComponent } from '../../shared/components/central-container/central-container.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    HeaderComponent,
    CentralContainerComponent,
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
    @Inject(AuthServiceImpl) private _authService: AuthService<LoggedUserJwtPayloadDto>,
    @Inject(NotificationServiceImpl) private _notificationService: NotificationService,
    @Inject(LoggedUserMapper) private readonly _loggedUserInfoMapper: Mapper<LoggedUserJwtPayloadDto, User>
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
