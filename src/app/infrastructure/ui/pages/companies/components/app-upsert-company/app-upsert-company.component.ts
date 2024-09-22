import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../../../../../core/domain/entities/company.entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upsert-company',
  standalone: true,
  imports: [DialogModule, InputMaskModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './app-upsert-company.component.html',
  styleUrl: './app-upsert-company.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppUpsertCompanyComponent {
  @Input() public data?: Company;
  @Input() public type!: 'save' | 'update';
  @Input() public visible = false;
  @Output() public visibleChange = new EventEmitter<boolean>();

  public saveCompany(): void {
    this.hideDialog();
  }

  public hideDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
