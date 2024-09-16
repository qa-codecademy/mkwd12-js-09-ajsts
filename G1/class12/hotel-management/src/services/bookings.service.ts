import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking, CreateBooking } from '../types/booking.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  private bookingsPath = `http://localhost:3000/api/bookings`;

  constructor(private readonly http: HttpClient) {}

  createBooking(booking: CreateBooking) {
    return this.http.post<Booking>(this.bookingsPath, booking);
  }
}
