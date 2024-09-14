import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { Room } from '../../types/room.interface';
import { RoomsComponent } from '../rooms/rooms.component';
import { RoomsService } from '../../services/rooms.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RoomsStore } from '../../store/rooms.store';
import { SearchRoomQuery } from '../../types/search-room-query.interface';

@Component({
  selector: 'app-rooms-page',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule, 
    MatPaginatorModule,
    RouterLink
  ],
  providers: [RoomsService],
  templateUrl: './rooms-page.component.html',
  styleUrl: './rooms-page.component.css',
})
export class RoomsPageComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'pricePerNight',
    'beds',
    'extraBeds',
    'baths',
    'guestCapacity',
    'view',
    'parking',
    // 'isPetFriendly',
    // 'board',
    // 'hasAirConditioning',
  ]
  roomsStore = inject(RoomsStore);
  subscription: Subscription = new Subscription();

  constructor(private roomService: RoomsService) {
    effect(
      () => {
        this.getRooms(this.roomsStore.searchParams())
      },
    )
  }

  getRooms(searchParams?: SearchRoomQuery) {
    this.subscription = this.roomService
    .getRooms(searchParams)
    .subscribe((response) => {
      this.roomsStore.setTotal(response.total);
      this.roomsStore.setRooms(response.payload);
      this.roomsStore.setLoading(false);
    })
  }

  ngOnInit(): void {
    this.getRooms();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
