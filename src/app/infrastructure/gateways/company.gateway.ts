import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTokenMapper } from '../../core/application/mappers/response-token.mapper';
import { ObservableUnsubscriberHook } from '../http/hooks/observable-unsubscriber-hook';
import { DevTtAbstractApiGateway } from './devtt-api.abstract.gateway';
import { CompanyGateway } from '../../core/abstractions/infrastructure/gateways/company.interface.gateway';
import { CompanyGetAllResponseDto } from '../dtos/company-get-all-response.dto';
import { Response } from '../../core/domain/valueobjects/response.valueobject';
import { CompanyCreateRequestDtoDto } from '../dtos/company-create-request.dto';
import { CompanyUpdateRequestDto } from '../dtos/company-update-request.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyGatewayImpl extends DevTtAbstractApiGateway implements CompanyGateway {
  private readonly _url: string = '/company';

  constructor(
    private readonly _http: HttpClient,
    private readonly _unsubscriberHook$: ObservableUnsubscriberHook,
    private readonly _mapper: ResponseTokenMapper,
  ) {
    super(_http, _unsubscriberHook$);
  }

  public getAll(
    name: string,
    cnpj: string,
    page: number,
    size: number,
  ): Observable<CompanyGetAllResponseDto> {
    const params = this._createParams(name, cnpj, page, size);
    return super.get(this._url, params);
  }

  public save(company: CompanyCreateRequestDtoDto): Observable<Response<string>> {
    return super.post(this._url, company);
  }

  public update(company: CompanyUpdateRequestDto): Observable<Response<string>> {
    return super.put(`${this._url}/${company.id.toString()}`, company);
  }

  public remove(id: number): Observable<Response<string>> {
    return super.delete(`${this._url}/${id.toString()}`);
  }

  private _createParams(name: string, cnpj: string, page: number, size: number): object {
    if (!name && !cnpj) {
      return { page: page.toString(), size: size.toString() };
    }
    return { name, cnpj, page: page.toString(), size: size.toString() };
  }
}
