import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    if (currentUser) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};
