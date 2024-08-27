import { Component, input } from '@angular/core';
import { Room } from '../../types/room.interface';
import { RoomComponent } from '../room/room.component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RoomComponent,
    MatGridListModule,
    RoomComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  // Rooms data is being sent from the parent component (home)
  // In the parent component its type is Observable<Room[]>()
  // But since we are sending the data to the child through async pipe, when we get it in the child, it is no more observable, but Room[]
  rooms = input<Room[]>([]); 
  breakpoint: number = 0;

  ngOnInit() {
    this.calculateBreakpoint();
  }

  calculateBreakpoint(innerWidth: number = window.innerWidth) {
    if (innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (innerWidth <= 768) {
      this.breakpoint = 2
    } else if (innerWidth <= 1024) {
      this.breakpoint = 3
    } else if (innerWidth <= 1200) {
      this.breakpoint = 4
    } else {
      this.breakpoint = 5
    }
  }

  onResize(event: any) {
    this.calculateBreakpoint(event.target.innerWidth);
  }
}
