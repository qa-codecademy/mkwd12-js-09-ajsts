import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestsComponent } from './guests.component';
import { GuestComponent } from './guest/guest.component';
import { GuestsService } from '../guests.service';

@NgModule({
  declarations: [GuestsComponent, GuestComponent],
  imports: [CommonModule],
  providers: [GuestsService],
})
export class GuestsModule {}
