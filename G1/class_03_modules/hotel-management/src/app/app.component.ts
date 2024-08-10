import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Room } from '../types/room.interface';
import roomJson from '../data/rooms.json';
import { RoomsComponent } from './rooms/rooms.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RoomsComponent, HomeComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  rooms = signal<Room[]>([...(roomJson as Room[])]);
  selectedPage = signal<'home' | 'room'>('room');

  handleSelectedPage(value: 'home' | 'room') {
    this.selectedPage.update(() => value);
  }
}
