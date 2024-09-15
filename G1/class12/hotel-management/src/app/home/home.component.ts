import { Component, effect, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Room } from '../../types/room.interface';
import { SearchComponent } from '../search/search.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { Board } from '../../types/board.enum';
import { RoomView } from '../../types/room-view.enum';
import { ParkingType } from '../../types/parking-type.enum';
import { RoomsService } from '../../services/rooms.service';
import { finalize, map, Observable, of, Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { SearchRoomQuery } from '../../types/search-room-query.interface';
import { Response } from '../../types/response.interface';
import { LoaderComponent } from '../loader/loader.component';
import { RoomsStore } from '../../store/rooms.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchComponent,
    RoomsComponent,
    CommonModule,
    FiltersComponent,
    MatPaginator,
    LoaderComponent,
  ],
  providers: [RoomsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  readonly roomsStore = inject(RoomsStore);
  subscription: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private roomService: RoomsService) {
    effect(
      () => {
        this.roomsStore.setLoading(true);
        this.getRooms(this.roomsStore.searchParams())
      },
      {
        allowSignalWrites: true
      }
    )
  }

  ngOnInit() {
    this.getRooms();
    this.getRooms();
  }

  getRooms(searchParams?: SearchRoomQuery) {
    this.subscription = this.roomService
    .getRooms(searchParams)
    .subscribe((response) => {
      this.roomsStore.setTotal(response.total);
      this.roomsStore.setRooms(response.payload);
      this.roomsStore.setLoading(false);
      if (this.paginator) {
        this.paginator.pageIndex = this.roomsStore.page();
      }
      
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
