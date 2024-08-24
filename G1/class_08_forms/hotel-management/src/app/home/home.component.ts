import { Component, effect, OnInit, signal } from '@angular/core';
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
  rooms$: Observable<Room[]> = new Observable<Room[]>();
  searchTerm = signal<string>('');
  guestCapacity = signal<number>(1);
  beds = signal<number>(1);
  board = signal<Board>(Board.None);
  view = signal<RoomView>(RoomView.None);
  parking = signal<ParkingType>(ParkingType.None);
  pricePerNightFrom = signal<number>(1);
  pricePerNightTo = signal<number>(1000);
  hasAirConditioning = signal<boolean>(false);
  isPetFriendly = signal<boolean>(false);
  pageSize = signal<number>(10);
  page = signal<number>(0);
  total = signal<number>(0);
  isLoading = signal<boolean>(false);

  constructor(private roomService: RoomsService) {
    effect(
      () => {
        const searchQueryParams: SearchRoomQuery = {
          page: this.page(),
          pageSize: this.pageSize(),
          searchTerm: this.searchTerm().length ? this.searchTerm() : '',
          pricePerNightMin: this.pricePerNightFrom(),
          pricePerNightMax: this.pricePerNightTo(),
          isPetFriendly: this.isPetFriendly(),
          hasAirConditioning: this.hasAirConditioning(),
        };

        if (this.guestCapacity() > 0) {
          searchQueryParams.guestCapacity = this.guestCapacity();
        }

        if (this.beds() > 0) {
          searchQueryParams.beds = this.beds();
        }

        if (this.board() !== Board.None) {
          searchQueryParams.board = this.board();
        }

        if (this.view() !== RoomView.None) {
          searchQueryParams.view = this.view();
        }

        if (this.parking() !== ParkingType.None) {
          searchQueryParams.parking = this.parking();
        }

        this.getRooms(searchQueryParams);
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms(searchParams?: SearchRoomQuery) {
    this.isLoading.set(true);

    this.rooms$ = this.roomService.getRooms(searchParams).pipe(
      tap((response: Response<Room[]>) => this.total.set(response.total)),
      map((response: Response<Room[]>) => response.payload),
      finalize(() => this.isLoading.set(false))
    );
  }

  handleUpdateSearchTerm(updatedSearchTerm: string) {
    this.searchTerm.update(() => updatedSearchTerm);
  }
}
