import { Component, OnInit, signal } from '@angular/core';
import { GuestsService } from '../../services/guests.service';
import { map, Observable, finalize } from 'rxjs';
import { Guest } from '../../types/guest.interface';
import { LoaderComponent } from '../loader/loader.component';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe, JsonPipe, DatePipe],
  providers: [GuestsService],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css',
})
export class GuestsComponent implements OnInit {
  guests$: Observable<Guest[]> = new Observable<Guest[]>();
  isLoading = signal<boolean>(false);

  constructor(private readonly guestService: GuestsService) {}

  ngOnInit() {
    this.isLoading.set(true);
    this.guests$ = this.guestService.getGuests().pipe(
      map((response) => response.payload),
      finalize(() => this.isLoading.set(false))
    );
  }
}
