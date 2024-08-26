import { Component, signal } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Observable, finalize, map, tap } from 'rxjs';
import { Room } from '../../types/room.interface';
import { SearchRoomQuery } from '../../types/search-room-query.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoomsComponent } from '../rooms/rooms.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RoomsComponent,
    MatPaginatorModule,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  rooms: Observable<Room[]> = new Observable<Room[]>();

  isLoading = signal<boolean>(true);

  total = signal(0);
  pageSize = signal(0);
  page = signal(0);

  constructor(
    private readonly roomService: RoomService
  ){};

  ngOnInit() {
    console.log('Home component loaded');
    this.getRooms();
  }

  getRooms(searchQuery: SearchRoomQuery = {}) {
    this.rooms = this.roomService.getRooms(searchQuery).pipe(
      tap((response) => this.total.set(response.total)),
      map((response) => response.payload),
      finalize(() => this.isLoading.set(false))
    )
  }

}
