import { Observable } from 'rxjs';
import { Response } from '../../../domain/valueobjects/response.valueobject';
import { Token } from '../../../domain/valueobjects/token.valueobject';

export interface LoginService {
  login(email: string, password: string): Observable<Response<Token>>;
}
