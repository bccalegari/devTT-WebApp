import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.interface.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceImpl implements AuthService {
  constructor(private readonly _router: Router) {}

  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
