import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(
        (module) => module.Home,
      ),
  },
  {
    path: 'dashboard/:id',
    canMatch: [authGuardGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then(
        (module) => module.Dashboard,
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./core/auth/login/login').then(
        (module) => module.Login,
      ),
  },
  {
    path: 'auth/register',
    canMatch: [authGuardGuard],
    loadComponent: () => import('./core/auth/register/register').then(
        (module) => module.Register,
      ),
  },
  {
    path: 'list',
    canMatch: [authGuardGuard],
    loadComponent: () => import('./features/list-user/list-user').then(
        (module) => module.ListUser,
      ),
  },
]