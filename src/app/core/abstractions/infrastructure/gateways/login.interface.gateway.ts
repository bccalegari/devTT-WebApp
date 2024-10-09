import { Observable } from 'rxjs';
import { LoginResponseDto } from '../../../../infrastructure/dtos/login-response.dto';

export interface LoginGateway {
  login(email: string, password: string): Observable<LoginResponseDto>;
}
