import { Routes } from '@angular/router';
import { authGuardGuard } from './take-home/core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: 'project',
    loadComponent: ()=> import('./init-project/init-project').then(m => m.InitProject),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./take-home/pages/home/home').then(m => m.Home)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./take-home/pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'auth/login',
        loadComponent: () => import('./take-home/core/auth/login/login').then((m) => m.Login)
      },
      {
        path: 'auth/register',
        canMatch: [authGuardGuard],
        loadComponent: () => import('./take-home/core/auth/register/register').then(m => m.Register)
      },
      {
        path: 'auth/register/:id',
        canMatch: [authGuardGuard],
        loadComponent: () => import('./take-home/core/auth/register/register').then(m => m.Register)
      },
      {
        path: 'list',
        canMatch: [authGuardGuard],
        loadComponent: () => import('./take-home/features/list-user/list-user').then(m => m.ListUser)
      },
    ]
  },
  {
    path: '',
    loadComponent: () => import('./init-tutor/init-tutor').then(m => m.InitTutor),
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      },
      {
        path: 'test-general',
        title: 'Test general · Certificación Angular',
        loadComponent: () =>
          import('./assessment/general-test.page').then((module) => module.GeneralTestPage)
      },
      {
        path: 'test-codigo',
        title: 'Análisis de código · Certificación Angular',
        loadComponent: () =>
          import('./assessment/code-test.page').then((module) => module.CodeTestPage)
      },
      {
        path: 'ejercicio-casa',
        title: 'Ejercicio de casa · Certificación Angular',
        loadComponent: () =>
          import('./take-home/users/users-page.component').then(
            (module) => module.UsersPageComponent
          )
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ]
  }

];
