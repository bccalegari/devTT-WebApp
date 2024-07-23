import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.interface.service';
import { AuthServiceImpl } from '../../../core/services/auth/auth.service';
import { LoggedUserJwtPayloadDto } from '../../dtos/logged-user-jwt-payload.dto';

export const authenticationGuard: CanActivateFn = () => {
  const service: AuthService<LoggedUserJwtPayloadDto> = inject(AuthServiceImpl);

  if (service.isAuthenticated()) {
    return true;
  }

  service.logout();
  return false;
};
