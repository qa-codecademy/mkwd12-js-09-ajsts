import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { SelectGuestComponent } from '../select-guest/select-guest.component';
import { RoomsService } from '../../services/rooms.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Room } from '../../types/room.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    AddGuestComponent,
    SelectGuestComponent,
    AsyncPipe,
  ],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
})
export class BookRoomComponent implements OnInit {
  room$: Observable<Room | null> = new Observable<Room | null>();
  selectedGuestType = signal<'existing' | 'new'>('existing');

  constructor(
    private roomService: RoomsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.room$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.roomService.getRoom(params['id'])),
      catchError(() => {
        return of(null);
      })
    );
  }
}
