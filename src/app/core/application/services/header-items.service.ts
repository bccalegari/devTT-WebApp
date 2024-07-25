import { Inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoggedUserJwtPayloadDto } from '../../../infrastructure/dtos/logged-user-jwt-payload.dto';
import { AuthService } from '../../abstractions/application/services/auth.interface.service';
import { HeaderItemsService } from '../../abstractions/application/services/header-items.interface.service';
import { NotificationService } from '../../abstractions/application/services/notification.interface.service';
import { RolesItemsFactory } from '../../domain/factory/roles-items.factory';
import { AuthServiceImpl } from './auth.service';
import { NotificationServiceImpl } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderItemsServiceImpl implements HeaderItemsService<MenuItem[]> {
  public constructor(
    @Inject(AuthServiceImpl) private readonly _authService: AuthService<LoggedUserJwtPayloadDto>,
    @Inject(NotificationServiceImpl)
    private readonly _notificationService: NotificationService,
  ) {}

  public get(role: string): MenuItem[] {
    if (role.length === 0) {
      return [];
    }

    const factory: RolesItemsFactory = new RolesItemsFactory(
      this._authService,
      this._notificationService,
    );
    return factory.createMenuItems(role);
  }
}
