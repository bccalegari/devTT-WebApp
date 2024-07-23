/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '../../core/domain/user.entity';

export class UserBuilder {
  private _valuesMap: Map<string, any> = new Map<string, any>();

  public setId(id: number): UserBuilder {
    this._valuesMap.set('id', id);
    return this;
  }

  public setName(name: string): UserBuilder {
    this._valuesMap.set('name', name);
    return this;
  }

  public setRole(role: string): UserBuilder {
    this._valuesMap.set('role', role);
    return this;
  }

  public build(): User {
    return new User(this._valuesMap.get('id'), this._valuesMap.get('name'), this._valuesMap.get('role'));
  }
}
