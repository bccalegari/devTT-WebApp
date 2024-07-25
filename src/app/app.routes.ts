import { Routes } from '@angular/router';
import { authenticationGuard } from './infrastructure/http/guard/auth.guard';
import { HomeComponent } from './infrastructure/ui/pages/home/home.component';

export const routes: Routes = [
  { path: '', canActivate: [authenticationGuard], component: HomeComponent },
  { path: 'login',
    loadComponent: () => import('./infrastructure/ui/pages/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'users', canActivate: [authenticationGuard],
    loadComponent: () => import('./infrastructure/ui/pages/users/users.component').then(m => m.UsersComponent) },
];
