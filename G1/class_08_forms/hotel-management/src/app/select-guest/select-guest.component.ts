import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuestsService } from '../../services/guests.service';
import { Guest } from '../../types/guest.interface';

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
export class SelectGuestComponent implements OnInit {
  guestControl = input<FormControl>(new FormControl(''));
  guests: Guest[] = [];

  constructor(private readonly guestsService: GuestsService) {}

  displayFn(guest: Guest): string {
    return guest ? `${guest.firstName} ${guest.lastName}` : '';
  }

  ngOnInit(): void {
    this.guestsService.getGuests().subscribe((response) => {
      this.guests = response.payload;
    });
  }
}
