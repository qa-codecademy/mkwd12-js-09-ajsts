import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getToken('access');

  const newRequest = req.clone({
    // Authorization => Header key-to
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(newRequest);
};
