/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { LoggedUserInfo } from '../../../../core/domain/logged-user-info.interface';
import { Mapper } from '../mapper.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserInfoMapper implements Mapper<any, LoggedUserInfo> {
  public map(response: any): LoggedUserInfo {
    return {
      name: response.name,
      role: response.role,
    };
  }
}
