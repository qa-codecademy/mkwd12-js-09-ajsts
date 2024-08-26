import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuestsService } from '../../services/guests.service';
import { Guest } from '../../types/guest.interface';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-select-guest',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  templateUrl: './select-guest.component.html',
  styleUrl: './select-guest.component.css',
})
export class SelectGuestComponent implements OnInit, OnDestroy {
  guestControl = input<FormControl>(new FormControl(''));
  guests: Guest[] = [];
  subscription: Subscription = new Subscription();

  constructor(private readonly guestsService: GuestsService) {}

  displayFn(guest: Guest): string {
    return guest ? `${guest.firstName} ${guest.lastName}` : '';
  }

  ngOnInit(): void {
    this.subscription = this.guestControl()
      .valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => this.guestsService.getGuests({ name: value }))
      )
      .subscribe((guestsResponse) => (this.guests = guestsResponse.payload));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
