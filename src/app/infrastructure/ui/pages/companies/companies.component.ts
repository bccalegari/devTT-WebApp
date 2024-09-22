import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
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
import { CompanyServiceImpl } from '../../../../core/application/services/company.service';
import { CompanyService } from '../../../../core/abstractions/application/services/company.interface.service';
import { debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap } from 'rxjs';
import { CompanyGetResponseDto } from '../../../dtos/company-get-response.dto';
import { Page } from '../../../../core/domain/valueobjects/page.valueobject';
import { Company } from '../../../../core/domain/entities/company.entity';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { AppUpsertCompanyComponent } from './components/app-upsert-company/app-upsert-company.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    LoggedLayoutComponent,
    TableModule,
    TagModule,
    ButtonModule,
    PaginatorModule,
    ProgressSpinnerModule,
    InputTextModule,
    AppUpsertCompanyComponent,
    ConfirmDialogModule,
  ],
  providers: [NotificationServiceImpl, ConfirmationService],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CompaniesComponent implements OnInit {
  private _searchSubject = new Subject<string>();
  public loggedUser!: User;
  public data: CompanyGetResponseDto[] = [];
  public totalRecords!: number;
  public loading = true;
  public companyDialogType!: 'save' | 'update';
  public displayNewCompanyDialog = false;
  public companyData!: Company;

  public constructor(
    @Inject(AuthServiceImpl) private readonly _authService: AuthService<LoggedUserJwtPayloadDto>,
    @Inject(NotificationServiceImpl) private readonly _notificationService: NotificationService,
    @Inject(LoggedUserMapper)
    private readonly _loggedUserInfoMapper: Mapper<LoggedUserJwtPayloadDto, User>,
    @Inject(CompanyServiceImpl)
    private readonly _companyService: CompanyService<Observable<Page<Company>>>,
    private confirmationService: ConfirmationService,
  ) {
    this._searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchInput =>
          this._companyService.getAll({ name: searchInput.trim(), cnpj: searchInput.trim() }),
        ),
      )
      .subscribe({
        next: page => {
          this.data = page.data;
          this.totalRecords = page.totalRecords;
        },
        error: error => {
          console.error(error);
          this._notificationService.notifyDefaultError();
        },
      });
  }

  public ngOnInit(): void {
    this._getLoggedUser();
    this._getCompanies();
  }

  public getNewCompanyPage(event: PaginatorState): void {
    this._getCompanies({
      page: event.page,
      size: event.rows,
    });
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  public filterCompanies(event: any): void {
    this._searchSubject.next(event.target.value);
  }

  public openNewCompanyDialog(): void {
    this.companyDialogType = 'save';
    this.displayNewCompanyDialog = true;
  }

  public openUpdateCompanyDialog(company: Company): void {
    this.companyData = company;
    this.companyDialogType = 'update';
    this.displayNewCompanyDialog = true;
  }

  public deleteCompany(event: any, company: Company): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Tem certeza que deseja deletar a empresa ${company.name}?`,
      header: 'Confirmação de exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      defaultFocus: 'reject',

      accept: () => {
        this._notificationService.notifySuccess('A empresa foi deletada com sucesso!');
      },
      reject: () => {
        this._notificationService.notifyError('Operação cancelada!');
      },
    });
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

  private _getCompanies(params?: {
    name?: string;
    cnpj?: string;
    page?: number;
    size?: number;
  }): void {
    this._companyService
      .getAll(params)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: page => {
          this.data = page.data;
          this.totalRecords = page.totalRecords;
        },
        error: error => {
          console.error(error);
          this._notificationService.notifyDefaultError();
        },
      });
  }
}
