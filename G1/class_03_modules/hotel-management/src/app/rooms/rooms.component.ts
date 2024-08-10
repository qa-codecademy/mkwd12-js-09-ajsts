import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Room } from '../../types/room.interface';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatGridListModule, RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  rooms = input<Room[]>([]);
}
