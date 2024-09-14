import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../types/room.interface';
import { environment } from '../environment';
import { SearchRoomQuery } from '../types/search-room-query.interface';
import { Observable, catchError, of } from 'rxjs';
import { Response } from '../types/response.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private roomPath = `${environment.apiURL}/rooms`;

  constructor(private readonly http: HttpClient) {}

  // This is same as adding Partial because Partial converts all properties to optional
  // getRooms(searchQuery: Partial<SearchRoomQuery> = {}): Observable<Response<Room[]>> { // Partial makes all properties optional
  getRooms(searchQuery: SearchRoomQuery = {}): Observable<Response<Room[]>> {
    return this.http
      .get<Response<Room[]>>(this.roomPath, {
        params: {
          ...searchQuery, // spread the properties of the searchQuery object into the params object
        },
      })
      .pipe(
        catchError((error) => {
          console.log(error);
          return of({ payload: [], total: 0 });
        }),
      );
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.roomPath}/${id}`, {});
  }
}
