import { Component, input, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Room } from '../../types/room.interface';
import { RoomComponent } from '../room/room.component';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [MatGridListModule, RoomComponent],
  providers: [RoomsService],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  rooms = input<Room[]>([]);
  cols: number = 0;

  ngOnInit(): void {
    this.calculateColumns();
  }

  calculateColumns(innerWidth: number = window.innerWidth) {
    if (innerWidth <= 400) {
      this.cols = 1;
    } else if (innerWidth <= 768) {
      this.cols = 2;
    } else if (innerWidth <= 1024) {
      this.cols = 3;
    } else if (innerWidth <= 1200) {
      this.cols = 4;
    } else {
      this.cols = 5;
    }
  }

  onResize(event: any) {
    this.calculateColumns(event.target.innerWidth);
  }
}
