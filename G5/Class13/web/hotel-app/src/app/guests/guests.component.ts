import { Component } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.css',
})
export class GuestsComponent {
  constructor(private readonly roomService: RoomService) {}
}
