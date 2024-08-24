import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../types/room.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private readonly baseURL = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  getRooms() {
    return this.http.get<{ payload: Room[]; total: number }>(
      `${this.baseURL}/rooms`
    );
  }
}
