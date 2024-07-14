import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoggedUserInfo } from '../../../../core/domain/logged-user-info.interface';
import { ObservableUnsubscriberHook } from '../../../http/hooks/observable-unsubscriber-hook';
import { LoggedUserInfoMapper } from '../../mappers/user/logged-user-info.mapper';
import { GenericGateway } from '../gateway';
import { LoggedUserInfoGateway } from './logged-user-info.interface.gateway';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserInfoGatewayImpl
  extends GenericGateway<LoggedUserInfo>
  implements LoggedUserInfoGateway<Observable<LoggedUserInfo>>
{
  private readonly _url: string = '/user/info';

  constructor(
    private readonly _http: HttpClient,
    private readonly _unsubscriberHook$: ObservableUnsubscriberHook,
    private readonly _mapper: LoggedUserInfoMapper,
  ) {
    super(_http, _unsubscriberHook$);
  }

  public getInfo(): Observable<LoggedUserInfo> {
    return super.get(this._url).pipe(map(this._mapper.map));
  }
}
