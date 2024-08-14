import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../types/room.interface';
import { HttpClient } from '@angular/common/http';

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

  getRooms(): Observable<any> {
    return this.http.get(this.roomPath);
  }
}
