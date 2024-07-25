
import { Injectable } from '@angular/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { LoginResponseDto } from '../../../infrastructure/dtos/login-response.dto';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';
import { Response } from '../../domain/valueobjects/response.valueobject';
import { Token } from '../../domain/valueobjects/token.valueobject';

@Injectable({
  providedIn: 'root',
})
export class ResponseTokenMapper extends Mapper<LoginResponseDto, Response<Token>> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(response: LoginResponseDto): Response<Token> {
    return Mapper.INTERNAL_MAPPER.map(response, LoginResponseDto, Response<Token>) as Response<Token>;
  }

  private buildMapper(): void {
    createMap<LoginResponseDto, Response<Token>>(
      Mapper.INTERNAL_MAPPER,
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
