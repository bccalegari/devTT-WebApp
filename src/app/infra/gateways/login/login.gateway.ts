import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../../dtos/login-response.dto';
import { ObservableUnsubscriberHook } from '../../http/hooks/observable-unsubscriber-hook';
import { ResponseTokenMapper } from '../../mappers/login/response-token.mapper';
import { ApiGateway } from '../api.abstract.gateway';
import { LoginGateway } from './login.interface.gateway';

@Injectable({
  providedIn: 'root',
})
export class LoginGatewayImpl
  extends ApiGateway<LoginResponseDto>
  implements LoginGateway<Observable<LoginResponseDto>>
{
  private readonly _url: string = '/auth/login';

  constructor(
    private readonly _http: HttpClient,
    private readonly _unsubscriberHook$: ObservableUnsubscriberHook,
    private readonly _mapper: ResponseTokenMapper,
  ) {
    super(_http, _unsubscriberHook$);
  }

  public login(email: string, password: string): Observable<LoginResponseDto> {
    return this.postLogin(email, password);
  }

  private postLogin(email: string, password: string): Observable<LoginResponseDto> {
    return super.post(this._url, { email, password });
  }
}
