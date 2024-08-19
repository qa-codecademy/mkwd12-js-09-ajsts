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

  // private _rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  // rooms: Observable<Room[]> = this._rooms.asObservable();

  constructor(private readonly http: HttpClient) {}

  // updateRooms(rooms: Room[]) {
  //   this._rooms.next(rooms);
  // }

  getRooms(
    searchQuery: SearchRoomQuery = {
      page: 2,
    }
  ): Observable<Response<Room[]>> {
    return this.http.get<Response<Room[]>>(this.roomPath, {
      params: {
        ...searchQuery,
      },
    });
  }
}
