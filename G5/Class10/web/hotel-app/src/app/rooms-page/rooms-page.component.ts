import { Component, effect, inject } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomsStore } from '../../store/rooms.store';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';
import { SearchRoomQuery } from '../../types/search-room-query.interface';

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatPaginatorModule,
    RouterLink,
  ],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css'
})
export class RoomsPageComponent {
  displayedColumns: string[] = [
    'name',
    'type',
    'pricePerNight',
    // 'beds',
    // 'extraBeds',
    // 'baths',
    // 'guestCapacity',
    // 'view',
    // 'parking',
    // 'isPetFriendly',
    // 'board',
    // 'hasAirConditioning',
  ]

  roomsStore = inject(RoomsStore);
  subscription: Subscription = new Subscription();

  constructor(
    private roomService: RoomService
  ) {
    effect(() => {
      this.getRooms(this.roomsStore.searchParams());
    })
  }

  getRooms(searchParams: SearchRoomQuery = {}) {
    this.subscription = this.roomService
      .getRooms(searchParams)
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
