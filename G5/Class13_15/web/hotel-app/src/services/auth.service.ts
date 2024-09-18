import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../environment';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from '../types/auth-response.interface';
import { Router } from '@angular/router';
import { User } from '../types/user.interface';
import { NotificationService } from './notification.service';
import { getErrorData } from '../utils/api.helpers';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authPath = `${environment.apiURL}/auth`;
  private usersPath = `${environment.apiURL}/users`;

  isAuth = signal<boolean>(false);
  currentUser = signal<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly loggingService: LoggingService,
  ) {}

  register(email: string, password: string) {
    const requestBody = {
      email,
      password,
    };

    return this.http.post(`${this.authPath}/register`, requestBody).pipe(
      // will consume the error if happens, but must return an observable
      catchError((errorResponse) => {
        this.notificationService.showNotification(errorResponse.error.message);

        return of(null);
      }),
    );
  }

  /**
   * - If success => save token and refresh token in LocalStorage
   * - On every request that requires the token, add it in the Authorization Header
   */
  login(email: string, password: string) {
    console.log('i am here');
    return this.http
      .post<AuthResponse>(`${this.authPath}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log('auth response', response);

          this.setToken(response.token, 'access');
          this.setToken(response.refreshToken, 'refresh');

          this.isAuth.set(true);
        }),
        switchMap(() => {
          this.notificationService.showNotification('Success login');
          return this.getMe();
        }),
        catchError((errorResponse) => {
          const { message, isClientError, isTechnicalError, status } =
            getErrorData(errorResponse);

          this.notificationService.showNotification(message);

          if (isTechnicalError) {
            // logging the error
            this.loggingService.trackError({
              errorCode: status,
              errorMessage: message,
              timestamp: Date.now(),
              section: 'LOGGING_USER',
            });
          }

          this.isAuth.set(false);
          return of(null);
        }),
      );
  }

  getMe(): Observable<User | null> {
    if (!this.getToken('access')) {
      return of(null);
    }

    return this.http.get<User>(`${this.usersPath}/me`).pipe(
      tap((response) => {
        console.log('GET ME: ', response);

        this.currentUser.set(response);
        this.isAuth.set(true);
      }),
      catchError((error) => {
        console.log(error);
        this.isAuth.set(false);
        this.currentUser.set(null);
        return of(null);
      }),
    );
  }

  refreshToken() {
    const refreshToken = this.getToken('refresh');

    return this.http
      .post<AuthResponse>(`${this.authPath}/refresh-token`, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          console.log('Refreshed the tokens, new values:', response);

          this.setToken(response.token, 'access');
          this.setToken(response.refreshToken, 'refresh');

          this.isAuth.set(true);
        }),
        catchError((error) => {
          console.error(error);

          // MAYBE THE REFRESH TOKEN WONT BE VALID
          // CHECK IF ERROR IS DUE TO INVALID REFRESH TOKEN
          if (error.status === 401) {
            this.logout();
          }
          return of(null);
        }),
      );
  }

  logout() {
    this.removeToken('access');
    this.removeToken('refresh');
    this.isAuth.set(false);
    this.router.navigate(['/login']);
    this.notificationService.showNotification('Success logout');
  }

  private setToken(token: string, type: 'access' | 'refresh') {
    localStorage.setItem(type, token);
  }

  getToken(key: 'access' | 'refresh') {
    return localStorage.getItem(key);
  }

  private removeToken(key: 'access' | 'refresh') {
    localStorage.removeItem(key);
  }
}
