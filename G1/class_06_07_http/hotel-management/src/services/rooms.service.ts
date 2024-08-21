import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../types/room.interface';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types/response.interface';
import { SearchRoomQuery } from '../types/search-room-query.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomPath = `http://localhost:3000/api/rooms`;

  constructor(private readonly http: HttpClient) {}

  getRooms(searchQuery: SearchRoomQuery = {}): Observable<Response<Room[]>> {
    return this.http.get<Response<Room[]>>(this.roomPath, {
      params: {
        ...searchQuery,
      },
    });
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.roomPath}/${id}`);
  }
}
