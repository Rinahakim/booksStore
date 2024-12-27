import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { User } from '../interface/user';

export const guardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const isLoggedIn = users.find((user : User) => user.isLoggedIn === true)
  const admin = JSON.parse(localStorage.getItem('Admin') || '{}');
  const isAdminLoggedIn = (admin.isAdminLogIn === true) ? true : false;

  if(isLoggedIn && isAdminLoggedIn)
  {
    return true;
  } 
  else if(isLoggedIn && !isAdminLoggedIn){
    if(route.routeConfig?.path === 'admin' || route.routeConfig?.path?.includes('admin')){
      router.navigate(['/admin/login']);
      return false
    }
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};
