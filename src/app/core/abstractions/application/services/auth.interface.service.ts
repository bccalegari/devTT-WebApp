import { Observable } from 'rxjs';

export interface AuthService<T> {
  isAuthenticated(): boolean;
  logout(): void;
  getLoggedUser(): Observable<T>;
}
