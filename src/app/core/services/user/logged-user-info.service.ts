import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUserInfoGatewayImpl } from '../../../infra/adapters/gateway/user/logged-user-info.gateway';
import { LoggedUserInfoGateway } from '../../../infra/adapters/gateway/user/logged-user-info.interface.gateway';
import { LoggedUserInfo } from '../../domain/logged-user-info.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserInfoServiceImpl {
  public constructor(
    @Inject(LoggedUserInfoGatewayImpl)
    private readonly _gateway: LoggedUserInfoGateway<Observable<LoggedUserInfo>>,
  ) {}

  public getInfo(): Observable<LoggedUserInfo> {
    return this._gateway.getInfo();
  }
}
