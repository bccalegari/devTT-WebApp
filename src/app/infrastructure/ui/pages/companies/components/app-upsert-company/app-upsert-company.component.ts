import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Company } from '../../../../../../core/domain/entities/company.entity';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompanyServiceImpl } from '../../../../../../core/application/services/company.service';
import { CompanyService } from '../../../../../../core/abstractions/application/services/company.interface.service';
import { NotificationServiceImpl } from '../../../../../../core/application/services/notification.service';
import { NotificationService } from '../../../../../../core/abstractions/application/services/notification.interface.service';
import { CompanyCreateRequestDtoDto } from '../../../../../dtos/company-create-request.dto';
import { CompanyUpdateRequestDto } from '../../../../../dtos/company-update-request.dto';

@Component({
  selector: 'app-upsert-company',
  standalone: true,
  imports: [
    DialogModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app-upsert-company.component.html',
  styleUrl: './app-upsert-company.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppUpsertCompanyComponent implements OnChanges {
  @Input() public data?: Company;
  @Input() public type!: 'save' | 'update';
  @Input() public visible = false;
  @Output() public visibleChange = new EventEmitter<boolean>();
  @Output() refreshTable = new EventEmitter<void>();
  public nameControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  public cnpjControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  public constructor(
    @Inject(NotificationServiceImpl) private readonly _notificationService: NotificationService,
    @Inject(CompanyServiceImpl) private readonly _companyService: CompanyService,
  ) {}

  public ngOnChanges(): void {
    this.nameControl.reset();
    this.cnpjControl.reset();

    if (this.type === 'update') {
      this.nameControl.setValue(this.data ? this.data.name : '');
      this.cnpjControl.setValue(this.data ? this.data.cnpj : '');
    }
  }

  public upsertCompany(): void {
    if (this.nameControl.invalid || this.cnpjControl.invalid) {
      this._notificationService.notifyError('Preencha todos os campos corretamente.');
      return;
    }

    const cnpj = this.cnpjControl.value.replace(/[.\-/]/g, '');

    if (this.type === 'save') {
      const company = new CompanyCreateRequestDtoDto(this.nameControl.value, cnpj);
      this.saveCompany(company);
      this.refreshTable.emit();
    } else if (this.type === 'update') {
      const company = new CompanyUpdateRequestDto(this.data!.id, this.nameControl.value, cnpj);
      this.updateCompany(company);
      this.refreshTable.emit();
    }
  }

  private saveCompany(company: CompanyCreateRequestDtoDto): void {
    this._companyService.save(company).subscribe({
      next: response => {
        this._notificationService.notifySuccess(response.message!);
        this.hideDialog();
      },
      error: response => {
        this._notificationService.notifyError(response.message);
        this.hideDialog();
      },
    });
  }

  private updateCompany(company: CompanyUpdateRequestDto): void {
    this._companyService.update(company).subscribe({
      next: response => {
        this._notificationService.notifySuccess(response.message!);
        this.hideDialog();
      },
      error: response => {
        this._notificationService.notifyError(response.message);
        this.hideDialog();
      },
    });
  }

  public hideDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
