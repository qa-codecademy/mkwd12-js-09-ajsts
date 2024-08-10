import { Component, input } from '@angular/core';
import { Room } from '../../types/room.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  room = input<Room | undefined>();
}
