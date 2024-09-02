import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddGuestComponent } from '../add-guest/add-guest.component';
import { SelectGuestComponent } from '../select-guest/select-guest.component';
import { RoomsService } from '../../services/rooms.service';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
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
import { MatButtonModule } from '@angular/material/button';
import { CreateBooking } from '../../types/booking.interface';
import { CreateGuest, Guest } from '../../types/guest.interface';
import { GuestsService } from '../../services/guests.service';
import { NotificationService } from '../../services/notifications.service';
import { NotificationType } from '../../types/notification-type.enum';

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
    MatButtonModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    BookingsService,
    RoomsService,
    NotificationService,
  ],
  templateUrl: './book-room.component.html',
  styleUrl: './book-room.component.css',
})
export class BookRoomComponent implements OnInit {
  room$: Observable<Room | null> = new Observable<Room | null>();
  selectedGuestType = signal<'existing' | 'new'>('existing');

  guestControl = new FormControl<Guest | null>(null, Validators.required);
  roomId = '';

  bookingForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  guestForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    passportNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private roomService: RoomsService,
    private activatedRoute: ActivatedRoute,
    private bookingsService: BookingsService,
    private router: Router,
    private guestService: GuestsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.room$ = this.activatedRoute.params.pipe(
      tap((params) => (this.roomId = params['id'])),
      switchMap((params) => this.roomService.getRoom(params['id'])),
      catchError(() => {
        return of(null);
      })
    );
  }

  onSubmit() {
    if (this.selectedGuestType() === 'new') {
      this.guestForm.markAllAsTouched();

      if (this.guestForm.invalid) {
        this.notificationService.showNotification(
          'Missing guest info',
          'Dismiss',
          NotificationType.Error
        );
        return;
      }

      this.guestService
        .addGuest(this.guestForm.value as CreateGuest)
        .pipe(
          switchMap((guest) => {
            return this.bookingsService.createBooking({
              ...this.bookingForm.value,
              roomId: this.roomId,
              guestId: guest.id,
            } as CreateBooking);
          })
        )
        .subscribe((createdBooking) => {
          if (!createdBooking) {
            return;
          }

          this.notificationService.showNotification(
            `You have successfully booked this room.`
          );
          this.router.navigate(['/']);
        });
    }

    if (this.selectedGuestType() === 'existing') {
      if (this.guestControl.invalid) {
        this.notificationService.showNotification(
          'You must select a guest',
          'Dismiss',
          NotificationType.Error
        );
        return;
      }

      this.bookingsService
        .createBooking({
          ...this.bookingForm.value,
          roomId: this.roomId,
          guestId: this.guestControl.value?.id,
        } as CreateBooking)
        .subscribe(
          {
            next: () => {
              this.notificationService.showNotification(
                'You have successfully booked this room.'
              );
              this.router.navigate(['/']);
            },
            error: ({ error: { message } }) => {
              this.notificationService.showNotification(
                message,
                'Dismiss',
                NotificationType.Error
              );
            },
          }
          // (response) => {
          //   console.log('WHILE BOOKING', response);
          //   if (!response) {
          //     return;
          //   }

          //   this.notificationService.showNotification(
          //     'You have successfully booked this room.'
          //   );
          //   this.router.navigate(['/']);
          // },
          // (error) => {
          //   console.log('WHILE BOOKING ERROR', error);
          // }
        );
    }
  }
}

// Using a second callback in subscribe to handle errors - OLD WAY - deprecated
// .subscribe(
//   (response) => {
//     console.log('WHILE BOOKING', response);
//     if (!response) {
//       return;
//     }

//     this.notificationService.showNotification(
//       'You have successfully booked this room.'
//     );
//     this.router.navigate(['/']);
//   },
//   (error) => {
//     console.log('WHILE BOOKING ERROR', error);
//   }
// );
