import { Observable } from 'rxjs';
import { LoggedUserInfo } from '../../domain/logged-user-info.interface';

export interface AuthService {
  isAuthenticated(): boolean;
  logout(): void;
  getUserLoggedInInfo(): Observable<LoggedUserInfo>;
}
