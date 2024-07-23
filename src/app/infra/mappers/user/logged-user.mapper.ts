
import { Injectable } from '@angular/core';
import { createMap, forMember, mapFrom } from '@automapper/core';
import { RoleUtils } from '../../../core/domain/role.enum';
import { User } from '../../../core/domain/user.entity';
import { LoggedUserJwtPayloadDto } from '../../dtos/logged-user-jwt-payload.dto';
import { Mapper } from '../mapper.abstract';


@Injectable({
  providedIn: 'root',
})
export class LoggedUserMapper extends Mapper<LoggedUserJwtPayloadDto, User> {
  public constructor() {
    super();
    this.buildMapper();
  }

  public override map(payload: LoggedUserJwtPayloadDto): User {
    return this.internalMapper.map(payload, LoggedUserJwtPayloadDto, User) as User;
  }

  private buildMapper(): void {
    createMap<LoggedUserJwtPayloadDto, User>(
      this.internalMapper,
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
        (d) => RoleUtils.getRole(d.role),
        mapFrom((s) => s.role)
      )
    );
  }
}
