import { Component } from '@angular/core';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css'
})
export class GuestsComponent {

  constructor() {
    console.log('Guests component loaded');
  }

  ngOnInit() {
    console.log('Guests component loaded');
  }
}
