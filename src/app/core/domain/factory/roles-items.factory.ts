import { MenuItem } from 'primeng/api';
import { LoggedUserJwtPayloadDto } from '../../../infrastructure/dtos/logged-user-jwt-payload.dto';
import { AuthService } from '../../abstractions/application/services/auth.interface.service';
import { NotificationService } from '../../abstractions/application/services/notification.interface.service';

export class RolesItemsFactory {
  private readonly ITEMS_WHITELIST: string[] = ['Início', 'Perfil', 'Sair'];
  private _items: MenuItem[] = [];
  private _rolesItems!: Map<string, string[]>;
  private readonly _authService: AuthService<LoggedUserJwtPayloadDto>;
  private readonly _notificationService: NotificationService;

  public constructor(authService: AuthService<LoggedUserJwtPayloadDto>, notificationService: NotificationService) {
    this._authService = authService;
    this._notificationService = notificationService;
    this.prepareFactory();
  }

  public createMenuItems(role: string): MenuItem[] {
    const userRolesItems: string[] = this._rolesItems.get(role)!;
    const items = [...this.ITEMS_WHITELIST, ...userRolesItems];
    return this._items.filter((item: MenuItem) => items.includes(item.label!));
  }

  private prepareFactory(): void {
    this._items = this.prepareItemsList(this._authService, this._notificationService);
    this._rolesItems = this.prepareRolesItems();
  }

  private prepareRolesItems(): Map<string, string[]> {
    return (this._rolesItems = new Map<string, string[]>([['Master', ['Usuários', 'Empresas']]]));
  }

  private prepareItemsList(
    authService: AuthService<LoggedUserJwtPayloadDto>,
    notificationService: NotificationService,
  ): MenuItem[] {
    return [
      {
        label: 'Início',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/perfil'],
      },
      {
        label: 'Usuários',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/users'],
      },
      {
        label: 'Empresas',
        icon: 'pi pi-fw pi-building',
        routerLink: ['/empresas'],
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          notificationService.notifySuccess('Logout realizado com sucesso');
          authService.logout();
        },
      },
    ];
  }
}
