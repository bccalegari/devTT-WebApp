import { Observable } from 'rxjs';
import { Page } from '../../../domain/valueobjects/page.valueobject';
import { Company } from '../../../domain/entities/company.entity';
import { Response } from '../../../domain/valueobjects/response.valueobject';
import { CompanyCreateRequestDtoDto } from '../../../../infrastructure/dtos/company-create-request.dto';
import { CompanyUpdateRequestDto } from '../../../../infrastructure/dtos/company-update-request.dto';

export interface CompanyService {
  getAll(params?: {name?: string, cnpj?: string, page?: number, size?: number}): Observable<Page<Company>>;
  save(company: CompanyCreateRequestDtoDto): Observable<Response<string>>;
  update(company: CompanyUpdateRequestDto): Observable<Response<string>>;
  delete(id: number): Observable<Response<string>>;
}
