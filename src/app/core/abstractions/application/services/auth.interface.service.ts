import { Observable } from 'rxjs';
import { LoggedUserJwtPayloadDto } from '../../../../infrastructure/dtos/logged-user-jwt-payload.dto';

export interface AuthService {
  isAuthenticated(): boolean;
  logout(): void;
  getLoggedUser(): Observable<LoggedUserJwtPayloadDto>;
}
