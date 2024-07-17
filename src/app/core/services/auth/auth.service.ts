import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoggedUserInfo } from '../../domain/logged-user-info.interface';
import { AuthService } from './auth.interface.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceImpl implements AuthService {
  public constructor(private readonly _router: Router) {}

  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return true;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public getUserLoggedInInfo(): Observable<LoggedUserInfo> {
    const token: string = localStorage.getItem('token') ?? '';

    return new Observable(observer => {
      try {
        observer.next(jwtDecode(token));
        observer.complete();
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }
}
