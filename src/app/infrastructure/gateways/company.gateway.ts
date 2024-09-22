import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseTokenMapper } from '../../core/application/mappers/response-token.mapper';
import { ObservableUnsubscriberHook } from '../http/hooks/observable-unsubscriber-hook';
import { DevTtAbstractApiGateway } from './devtt-api.abstract.gateway';
import { CompanyGateway } from '../../core/abstractions/infrastructure/gateways/company.interface.gateway';
import { CompanyGetAllResponseDto } from '../dtos/company-get-all-response.dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyGatewayImpl
  extends DevTtAbstractApiGateway<CompanyGetAllResponseDto>
  implements CompanyGateway<Observable<CompanyGetAllResponseDto>>
{
  private readonly _url: string = '/company';

  constructor(
    private readonly _http: HttpClient,
    private readonly _unsubscriberHook$: ObservableUnsubscriberHook,
    private readonly _mapper: ResponseTokenMapper,
  ) {
    super(_http, _unsubscriberHook$);
  }

  public getAll(name: string, cnpj: string, page: number, size: number): Observable<CompanyGetAllResponseDto> {
    const params = this._createParams(name, cnpj, page, size);
    return this.get(this._url, params);
  }

  private _createParams(name: string, cnpj: string, page: number, size: number): object {
    if (!name && !cnpj) {
      return { page: page.toString(), size: size.toString() };
    }
    return { name, cnpj, page: page.toString(), size: size.toString() };
  }
}
