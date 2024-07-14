import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../../../../core/domain/response.interface';
import { Token } from '../../../../core/domain/token.interface';
import { ObservableUnsubscriberHook } from '../../../http/hooks/observable-unsubscriber-hook';
import { ResponseTokenMapper } from '../../mappers/login/response-token.mapper';
import { GenericGateway } from '../gateway';
import { LoginGateway } from './login.interface.gateway';

@Injectable({
  providedIn: 'root',
})
export class LoginGatewayImpl
  extends GenericGateway<Response<Token>>
  implements LoginGateway<Observable<Response<Token>>>
{
  private readonly _url: string = '/auth/login';

  constructor(
    private readonly _http: HttpClient,
    private readonly _unsubscriberHook$: ObservableUnsubscriberHook,
    private readonly _mapper: ResponseTokenMapper,
  ) {
    super(_http, _unsubscriberHook$);
  }

  public login(email: string, password: string): Observable<Response<Token>> {
    return this.postLogin(email, password);
  }

  private postLogin(email: string, password: string): Observable<Response<Token>> {
    return super.post(this._url, { email, password }).pipe(map(this._mapper.map));
  }
}
