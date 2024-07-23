import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponseDto } from '../../../infra/dtos/login-response.dto';
import { LoginGatewayImpl } from '../../../infra/gateways/login/login.gateway';
import { LoginGateway } from '../../../infra/gateways/login/login.interface.gateway';
import { ResponseTokenMapper } from '../../../infra/mappers/login/response-token.mapper';
import { Mapper } from '../../../infra/mappers/mapper.abstract';
import { Response } from '../../domain/response.valueobject';
import { Token } from '../../domain/token.valueobject';
import { LoginService } from './login.interface.service';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceImpl implements LoginService<Observable<Response<Token>>> {
  public constructor(
    @Inject(LoginGatewayImpl)
    private readonly _gateway: LoginGateway<Observable<LoginResponseDto>>,
    @Inject(ResponseTokenMapper) private readonly _mapper: Mapper<LoginResponseDto, Response<Token>>
  ) {}

  public login(email: string, password: string): Observable<Response<Token>> {
    return this._gateway.login(email, password)
      .pipe(
        map(this._mapper.map)
      );
  }
}
