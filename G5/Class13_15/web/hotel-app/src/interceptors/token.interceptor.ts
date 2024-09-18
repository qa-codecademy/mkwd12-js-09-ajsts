import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

const WHITELISTED_URLS = ['http://localhost:3000/api/auth/login'];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request url in interceptor', req.url);
  const isUrlWhiteListed = WHITELISTED_URLS.includes(req.url);

  // This costum logic, checks/prevents if the given URL is matching to modify the headers
  if (isUrlWhiteListed) {
    return next(req);
  }

  console.log('I AM HERE AFTER WHITELIST', req.url);
  const authService = inject(AuthService);

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
