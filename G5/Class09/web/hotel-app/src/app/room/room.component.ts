import { Component, input, signal } from '@angular/core';
import { Room } from '../../types/room.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  room = input.required<Room>();
  readonly panelOpenState = signal(false);

  openPanel(isOpen: boolean) {
    this.panelOpenState.set(isOpen);
  }
}
