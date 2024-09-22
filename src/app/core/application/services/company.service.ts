import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompanyService } from '../../abstractions/application/services/company.interface.service';
import { CompanyGateway } from '../../abstractions/infrastructure/gateways/company.interface.gateway';
import { CompanyGatewayImpl } from '../../../infrastructure/gateways/company.gateway';
import { CompanyGetAllResponseDto } from '../../../infrastructure/dtos/company-get-all-response.dto';
import { CompanyPageMapper } from '../mappers/company-page.mapper';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';
import { Company } from '../../domain/entities/company.entity';
import { Page } from '../../domain/valueobjects/page.valueobject';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceImpl implements CompanyService<Observable<Page<Company>>> {
  public constructor(
    @Inject(CompanyGatewayImpl)
    private readonly _gateway: CompanyGateway<Observable<CompanyGetAllResponseDto>>,
    @Inject(CompanyPageMapper)
    private readonly _mapper: Mapper<CompanyGetAllResponseDto, Page<Company>>,
  ) {}

  public getAll(params?: {name?: string, cnpj?: string, page?: number, size?: number}): Observable<Page<Company>> {
    const name = params?.name ?? '';
    const cnpj = params?.cnpj ?? '';
    const page = params?.page ?? 0;
    const size = params?.size ?? 5;
    return this._gateway.getAll(name, cnpj, page, size).pipe(
      map(this._mapper.map)
    );
  }
}
