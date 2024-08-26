import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGuest, Guest } from '../types/guest.interface';
import { Response } from '../types/response.interface';

@Injectable({
  providedIn: 'root',
})
export class GuestsService {
  guestsPath = `http://localhost:3000/api/guests`;

  constructor(private readonly http: HttpClient) {}

  getGuests(): Observable<Response<Guest[]>> {
    return this.http.get<Response<Guest[]>>(this.guestsPath);
  }

  addGuest(guest: CreateGuest): Observable<Guest> {
    return this.http.post<Guest>(this.guestsPath, guest);
  }
}
