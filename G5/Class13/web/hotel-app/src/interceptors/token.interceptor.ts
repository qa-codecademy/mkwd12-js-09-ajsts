import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url === '/guests') {
    // with some other modifications
    return next(req);
  }
  const accessToken = authService.getToken('access');

  const newRequest = req.clone({
    // Authorization => Header key-to
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return next(newRequest).pipe(
    catchError((error) => {
      if (error.status === 401 && accessToken) {
        console.log('Token expired', error);
        console.log('About to refresh the token...');

        return authService.refreshToken().pipe(
          switchMap(() => {
            const newAccessToken = authService.getToken('access');

            const requestWithUpdatedToken = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            return next(requestWithUpdatedToken);
          }),
        );
      }

      return throwError(() => new Error(error));
    }),
  );
};
