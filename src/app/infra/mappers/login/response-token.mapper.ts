
import { Injectable } from '@angular/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { Response } from '../../../core/domain/response.valueobject';
import { Token } from '../../../core/domain/token.valueobject';
import { LoginResponseDto } from '../../dtos/login-response.dto';
import { Mapper } from '../mapper.abstract';

@Injectable({
  providedIn: 'root',
})
export class ResponseTokenMapper extends Mapper<LoginResponseDto, Response<Token>> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(response: LoginResponseDto): Response<Token> {
    return this.internalMapper.map(response, LoginResponseDto, Response<Token>) as Response<Token>;
  }

  private buildMapper(): void {
    createMap<LoginResponseDto, Response<Token>>(
      this.internalMapper,
      LoginResponseDto,
      Response<Token>,
      forMember(
        (d) => d.data.token,
        mapFrom((s) => s.bearerToken)
      ),
      forMember(
        (d) => d.message,
        mapFrom((s) => s.message)
      )
    );
  }
}
