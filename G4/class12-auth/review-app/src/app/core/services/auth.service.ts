import {
  ApplicationInitStatus,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  RegisterReq,
  User,
  UserCredentails,
} from '../../feature/auth/auth.model';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(AuthApiService);

  userData = signal<User>(null);

  constructor() {
    this.getUserFromLocalStorage();
  }

  registerUser(req: RegisterReq) {
    this.apiService.registerUser(req).subscribe({
      next: () => {
        console.log('user registered');
        this.router.navigate(['login']);
      },
      error: (err) => console.log(err),
    });
  }

  loginUser(credentials: UserCredentails) {
    this.apiService.loginUser(credentials).subscribe({
      next: (res) => {
        const token = res.headers.get('access-token');

        console.log('token', token);
        console.log('body', res.body);

        this.userData.set({ ...res.body, token });

        this.saveUserInLocalStorage(this.userData());

        this.router.navigate(['']);
      },
      error: (err) => console.log(err),
    });
  }

  saveUserInLocalStorage(userData: User) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserFromLocalStorage() {
    const userJSON = localStorage.getItem('userData');

    if (!userJSON) return;

    this.userData.set(JSON.parse(userJSON));
  }

  logoutUser() {
    this.userData.set(null);
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
  }
}
