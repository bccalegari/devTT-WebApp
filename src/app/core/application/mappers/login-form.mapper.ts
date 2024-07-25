import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { LoginFormDto } from '../../../infrastructure/dtos/login-form.dto';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';

@Injectable({
  providedIn: 'root',
})
export class LoginFormMapper extends Mapper<FormGroup, LoginFormDto> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(payload: FormGroup): LoginFormDto {
    return Mapper.INTERNAL_MAPPER.map(payload, FormGroup, LoginFormDto) as LoginFormDto;
  }

  private buildMapper(): void {
    createMap<FormGroup, LoginFormDto>(
      Mapper.INTERNAL_MAPPER,
      FormGroup,
      LoginFormDto,
      forMember(
        (d) => d.email,
        mapFrom((s) => s.get('email')?.value)
      ),
      forMember(
        (d) => d.password,
        mapFrom((s) => s.get('password')?.value)
      )
    );
  }
}
