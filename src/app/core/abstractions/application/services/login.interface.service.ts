export interface LoginService<T> {
  login(email: string, password: string): T;
}
