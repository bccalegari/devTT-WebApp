import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../../core/abstractions/application/services/auth.interface.service';
import { AuthServiceImpl } from '../../../core/application/services/auth.service';

export const authenticationGuard: CanActivateFn = () => {
  const service: AuthService = inject(AuthServiceImpl);

  if (service.isAuthenticated()) {
    return true;
  }

  service.logout();
  return false;
};
