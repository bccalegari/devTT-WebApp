import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { HeaderItemsService } from '../../../../../../../core/abstractions/application/services/header-items.interface.service';
import { HeaderItemsServiceImpl } from '../../../../../../../core/application/services/header-items.service';
import { NotificationServiceImpl } from '../../../../../../../core/application/services/notification.service';
import { RoleUtils } from '../../../../../../../core/domain/enums/role.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  providers: [NotificationServiceImpl, HeaderItemsServiceImpl],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() public role!: string;
  public items!: MenuItem[];

  constructor(
    @Inject(HeaderItemsServiceImpl)
    private _service: HeaderItemsService<MenuItem[]>,
  ) {}

  public ngOnInit(): void {
    this.role = RoleUtils.getRole(this.role);
    this.items = this._service.get(this.role);
  }
}
