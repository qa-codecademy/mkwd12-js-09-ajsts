import { ParkingType } from './../../types/parking-type.enum';
import { Component, input } from '@angular/core';
import { Room } from '../../types/room.interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Board } from '../../types/board.enum';
import { RoomView } from '../../types/room-view.enum';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    NgIf,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  room = input<Room | undefined>();

  ParkingType = ParkingType;
  Board = Board;
  RoomView = RoomView;
}
