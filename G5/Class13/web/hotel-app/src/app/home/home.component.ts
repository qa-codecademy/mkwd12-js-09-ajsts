import { Component, effect, inject } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { Subscription } from 'rxjs';
import { SearchRoomQuery } from '../../types/search-room-query.interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RoomsComponent } from '../rooms/rooms.component';
import { AsyncPipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { RoomsStore } from '../../store/rooms.store';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RoomsComponent,
    MatPaginatorModule,
    AsyncPipe,
    SearchComponent,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly roomsStore = inject(RoomsStore);
  subscription: Subscription = new Subscription();

  constructor(private readonly roomService: RoomService) {
    effect(
      () => {
        this.roomsStore.setLoading(true);
        this.getRooms(this.roomsStore.searchParams());
      },
      // We use this flag when we want to write or modify signal values as part of its execution.
      // It allows updates to signals during the effect's execution
      {
        allowSignalWrites: true,
      },
    );
  }

  getRooms(serchParams: SearchRoomQuery = {}) {
    this.subscription = this.roomService
      .getRooms(serchParams)
      .subscribe((response) => {
        this.roomsStore.setTotal(response.total);
        this.roomsStore.setRooms(response.payload);
        this.roomsStore.setLoading(false);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
