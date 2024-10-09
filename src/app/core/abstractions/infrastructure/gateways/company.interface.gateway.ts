import { Observable } from 'rxjs';
import { CompanyGetAllResponseDto } from '../../../../infrastructure/dtos/company-get-all-response.dto';
import { Response } from '../../../domain/valueobjects/response.valueobject';
import { CompanyCreateRequestDtoDto } from '../../../../infrastructure/dtos/company-create-request.dto';
import { CompanyUpdateRequestDto } from '../../../../infrastructure/dtos/company-update-request.dto';

export interface CompanyGateway {
  getAll(
    name: string,
    cnpj: string,
    page: number,
    size: number,
  ): Observable<CompanyGetAllResponseDto>;
  save(company: CompanyCreateRequestDtoDto): Observable<Response<string>>;
  update(company: CompanyUpdateRequestDto): Observable<Response<string>>;
  remove(id: number): Observable<Response<string>>;
}
