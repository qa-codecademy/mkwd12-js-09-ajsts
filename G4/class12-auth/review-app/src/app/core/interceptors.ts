import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { finalize, tap } from 'rxjs';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (req.url.includes('login') || req.url.includes('register'))
    return next(req);

  if (!authService.userData()) return next(req);

  const token = authService.userData().token;

  const clone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(clone);
};

export const loaderInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);

  loaderService.toggleLoader(true);

  return next(req).pipe(finalize(() => loaderService.toggleLoader(false)));
};
