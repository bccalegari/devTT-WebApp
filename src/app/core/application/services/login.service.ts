import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginResponseDto } from '../../../infrastructure/dtos/login-response.dto';
import { LoginGatewayImpl } from '../../../infrastructure/gateways/login.gateway';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';
import { LoginService } from '../../abstractions/application/services/login.interface.service';
import { LoginGateway } from '../../abstractions/infrastructure/gateways/login.interface.gateway';
import { Response } from '../../domain/valueobjects/response.valueobject';
import { Token } from '../../domain/valueobjects/token.valueobject';
import { ResponseTokenMapper } from '../mappers/response-token.mapper';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceImpl implements LoginService {
  public constructor(
    @Inject(LoginGatewayImpl)
    private readonly _gateway: LoginGateway,
    @Inject(ResponseTokenMapper) private readonly _mapper: Mapper<LoginResponseDto, Response<Token>>
  ) {}

  public login(email: string, password: string): Observable<Response<Token>> {
    return this._gateway.login(email, password)
      .pipe(
        map(this._mapper.map)
      );
  }
}
