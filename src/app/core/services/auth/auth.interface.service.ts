export interface AuthService {
  isAuthenticated(): boolean;
  logout(): void;
}
