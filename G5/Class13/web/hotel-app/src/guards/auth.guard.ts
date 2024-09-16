import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../types/user-role.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  //localhost:3000/rooms => state.url

  if (!authService.isAuth()) {
    router.navigate(['/login']);
  }

  console.log(route.data['roles']);

  const allowedRouteRoles = route.data['roles'];

  if (allowedRouteRoles?.length) {
    const userRole = authService.currentUser()?.role;

    if (!userRole) {
      return router.navigate(['/not-allowed']);
    }

    const isUserAllowed: boolean = allowedRouteRoles.some(
      (role: UserRole) => role === userRole,
    );

    if (!isUserAllowed) {
      return router.navigate(['/not-allowed']);
    }
  }

  return true;
};
