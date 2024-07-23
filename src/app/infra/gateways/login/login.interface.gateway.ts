export interface LoginGateway<T> {
  login(email: string, password: string): T;
}
