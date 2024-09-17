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

  logoutUser(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/logout`, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.get(`${BASE_URL}/auth/refresh-token`, {
      headers: {
        'refresh-token': refreshToken,
      },
      //We observe the response here to get the new refresh and access token from the response headers
      observe: 'response',
    });
  }
}
