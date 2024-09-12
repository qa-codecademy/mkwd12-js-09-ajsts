import { Board } from './../../../../../class_05_routing-services/hotel-management/src/types/board.enum';
import { ParkingType } from './../../../../../class_05_routing-services/hotel-management/src/types/parking-type.enum';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { Room } from '../../types/room.interface';
import {
  AsyncPipe,
  CurrencyPipe,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { RoomView } from '../../types/room-view.enum';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgClass,
    CurrencyPipe,
    YesNoPipe,
    LoaderComponent,
    NgIf,
  ],
  providers: [RoomsService],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent implements OnInit {
  room$: Observable<Room | null> = new Observable<Room | null>();
  isLoading = signal<boolean>(false);

  RoomView = RoomView;
  ParkingType = ParkingType;
  Board = Board;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomsService
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.room$ = this.activatedRoute.params.pipe(
      switchMap((params) =>
        this.roomService
          .getRoom(params['id'])
          .pipe(finalize(() => this.isLoading.set(false)))
      ),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }
}

// DO NOT DO THIS EVER!!!!
// this.activatedRoute.params.subscribe((params) => {
//   console.log(params['id']);
//   this.roomService
//     .getRoom(params['id'])
//     .subscribe((roomResponse) => console.log(roomResponse));
// });
