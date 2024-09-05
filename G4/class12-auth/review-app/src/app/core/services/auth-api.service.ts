import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterReq,
  User,
  UserCredentails,
} from '../../feature/auth/auth.model';
import { BASE_URL } from '../core.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  registerUser(req: RegisterReq) {
    return this.http.post(`${BASE_URL}/auth/register`, req);
  }

  loginUser(credentials: UserCredentails) {
    return this.http.post<User>(`${BASE_URL}/auth/login`, credentials, {
      //Observe response will return the whole response object instead of only the body
      observe: 'response',
    });
  }
}
