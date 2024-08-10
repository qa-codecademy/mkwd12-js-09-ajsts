import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsModule } from './rooms/rooms.module';
import { GuestsModule } from './guests/guests.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RoomsModule, GuestsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
