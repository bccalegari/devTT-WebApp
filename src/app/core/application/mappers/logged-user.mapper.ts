
import { Injectable } from '@angular/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { LoggedUserJwtPayloadDto } from '../../../infrastructure/dtos/logged-user-jwt-payload.dto';
import { Mapper } from '../../abstractions/application/mappers/mapper.abstract';
import { User } from '../../domain/entities/user.entity';
import { RoleUtils } from '../../domain/enums/role.enum';


@Injectable({
  providedIn: 'root',
})
export class LoggedUserMapper extends Mapper<LoggedUserJwtPayloadDto, User> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(payload: LoggedUserJwtPayloadDto): User {
    return Mapper.INTERNAL_MAPPER.map(payload, LoggedUserJwtPayloadDto, User) as User;
  }

  private buildMapper(): void {
    createMap<LoggedUserJwtPayloadDto, User>(
      Mapper.INTERNAL_MAPPER,
      LoggedUserJwtPayloadDto,
      User,
      forMember(
        (d) => d.id,
        mapFrom((s) => s.id)
      ),
      forMember(
        (d) => d.name,
        mapFrom((s) => s.name)
      ),
      forMember(
        (d) => d.role,
        mapFrom((s) => RoleUtils.getRole(s.role))
      )
    );
  }
}
