import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuardGuard: CanActivateFn = (route, state) => {
  
  if(localStorage.getItem('isLogged')){
    return true;
  }

  return  inject(Router).createUrlTree(['./proyecto/auth/login']);

};
