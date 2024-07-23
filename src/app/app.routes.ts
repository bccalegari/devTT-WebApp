import { Routes } from '@angular/router';
import { authenticationGuard } from './infra/http/guard/auth.guard';
import { HomeComponent } from './view/pages/home/home.component';
import { LoginComponent } from './view/pages/login/login.component';
import { UsersComponent } from './view/pages/users/users.component';

export const routes: Routes = [
  { path: '', canActivate: [authenticationGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', canActivate: [authenticationGuard], component: UsersComponent },
];
