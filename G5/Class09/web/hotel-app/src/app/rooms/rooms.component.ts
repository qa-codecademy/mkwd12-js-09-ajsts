import { Component, signal } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../types/room.interface';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  rooms = signal<Room[]>([]);

  constructor(private readonly roomsService: RoomsService) {}

  ngOnInit() {
    this.roomsService.getRooms().subscribe((data) => {
      console.log('Rooms:', data);
      this.rooms.set(data.payload);
    });
  }
}
