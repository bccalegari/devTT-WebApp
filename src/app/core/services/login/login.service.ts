import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginGatewayImpl } from '../../../infra/adapters/gateway/login/login.gateway';
import { LoginGateway } from '../../../infra/adapters/gateway/login/login.interface.gateway';
import { Response } from '../../domain/response.interface';
import { Token } from '../../domain/token.interface';
import { LoginService } from './login.interface.service';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceImpl implements LoginService<Observable<Response<Token>>> {
  public constructor(
    @Inject(LoginGatewayImpl)
    private readonly _gateway: LoginGateway<Observable<Response<Token>>>,
  ) {}

  public login(email: string, password: string): Observable<Response<Token>> {
    return this._gateway.login(email, password);
  }
}
