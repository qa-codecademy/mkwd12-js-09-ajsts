import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';
import { NotificationsService } from './services/notifications.service';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const notificationsService = inject(NotificationsService);

  if (
    req.url.includes('login') ||
    req.url.includes('register') ||
    req.url.includes('refresh-token')
  )
    return next(req);

  if (!authService.userData()) return next(req);

  const token = authService.userData().token;

  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(clone).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 403) {
        return authService
          .refreshAccessToken(authService.userData().refreshToken)
          .pipe(
            catchError(() => {
              //THis is handling an error for the refresh token endpoint
              notificationsService.showToast(
                'Session Expired, Please Log In',
                false
              );
              authService.logoutFromClient();
              return EMPTY;
            }),
            switchMap((response) => {
              const newToken = response.headers.get('access-token');

              const newClone = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`),
              });

              return next(newClone);
            })
          );
      }

      return next(clone);
    })
  );
};

export const loaderInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);

  loaderService.toggleLoader(true);

  return next(req).pipe(finalize(() => loaderService.toggleLoader(false)));
};
