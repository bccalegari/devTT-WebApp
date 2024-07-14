import { Inject, Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RolesItemsFactory } from '../../factory/roles-items.factory';
import { AuthService } from '../auth/auth.interface.service';
import { AuthServiceImpl } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.interface.service';
import { NotificationServiceImpl } from '../notification/notification.service';
import { HeaderItemsService } from './header-items.interface.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderItemsServiceImpl implements HeaderItemsService<MenuItem[]> {
  public constructor(
    @Inject(AuthServiceImpl) private readonly _authService: AuthService,
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
