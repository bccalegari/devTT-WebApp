import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ApiErrorFactory } from '../../errors/api-error.factory';
import { Response } from '../../domain/response.interface';
import { Token } from '../../domain/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Response<Token>> {
    return this.postLogin(email, password);
  }

  private postLogin(email: string, password: string): Observable<Response<Token>> {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        map(this.mapResponse),
        catchError(this.handleError)
      );
  }

  private mapResponse(response: any): Response<Token> {
    return {
      data: {
        token: response.bearerToken
      },
      message: response.message
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    throw ApiErrorFactory.createApiError(error);
  }
}
