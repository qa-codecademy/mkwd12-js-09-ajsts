import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { SelectGuestComponent } from '../select-guest/select-guest.component';
import { RoomsService } from '../../services/rooms.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Room } from '../../types/room.interface';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    AddGuestComponent,
    SelectGuestComponent,
    AsyncPipe,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BookingsService,
    RoomsService,
  ],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
})
export class BookRoomComponent implements OnInit {
  room$: Observable<Room | null> = new Observable<Room | null>();
  selectedGuestType = signal<'existing' | 'new'>('existing');

  bookingForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private roomService: RoomsService,
    private activatedRoute: ActivatedRoute,
    private bookingsService: BookingsService
  ) {}

  ngOnInit() {
    this.room$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.roomService.getRoom(params['id'])),
      catchError(() => {
        return of(null);
      })
    );
  }

  onSubmit() {
    console.log('submitting...');
  }
}
