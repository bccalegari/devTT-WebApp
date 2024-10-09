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
import { Response } from '../../domain/valueobjects/response.valueobject';
import { CompanyCreateRequestDtoDto } from '../../../infrastructure/dtos/company-create-request.dto';
import { CompanyUpdateRequestDto } from '../../../infrastructure/dtos/company-update-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyServiceImpl implements CompanyService {
  public constructor(
    @Inject(CompanyGatewayImpl)
    private readonly _gateway: CompanyGateway,
    @Inject(CompanyPageMapper)
    private readonly _mapper: Mapper<CompanyGetAllResponseDto, Page<Company>>,
  ) {}

  public getAll(params?: {
    name?: string;
    cnpj?: string;
    page?: number;
    size?: number;
  }): Observable<Page<Company>> {
    const name = params?.name ?? '';
    const cnpj = params?.cnpj ?? '';
    const page = params?.page ?? 0;
    const size = params?.size ?? 5;
    return this._gateway.getAll(name, cnpj, page, size).pipe(map(this._mapper.map));
  }

  public save(company: CompanyCreateRequestDtoDto): Observable<Response<string>> {
    return this._gateway.save(company);
  }

  public update(company: CompanyUpdateRequestDto): Observable<Response<string>> {
    return this._gateway.update(company);
  }

  public delete(id: number): Observable<Response<string>> {
    return this._gateway.remove(id);
  }
}
