import { UserBuilder } from '../builders/user.builder';
import { Role } from '../enums/role.enum';

export class User {
  public readonly id!: number;
  public readonly name!: string;
  public readonly role!: Role;

  public constructor(id: number, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  static Builder = UserBuilder;
}
