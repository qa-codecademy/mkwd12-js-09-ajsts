import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../types/room.interface';
import roomJson from '../data/rooms.json';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private _rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);

  rooms: Observable<Room[]> = this._rooms.asObservable();

  constructor() {
    this.updateRooms(roomJson as Room[]);
  }

  updateRooms(rooms: Room[]) {
    this._rooms.next(rooms);
  }
}
