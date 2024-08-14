import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RoomComponent } from '../room/room.component';
import { RoomsService } from '../rooms.service';

@NgModule({
  declarations: [RoomsComponent, RoomComponent],
  imports: [CommonModule],
  providers: [RoomsService],
})
export class RoomsModule {}
