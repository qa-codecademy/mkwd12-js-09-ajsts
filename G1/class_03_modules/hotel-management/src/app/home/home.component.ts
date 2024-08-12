import { Component, computed, input, signal } from '@angular/core';
import { Room } from '../../types/room.interface';
import { SearchComponent } from '../search/search.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, RoomsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  rooms = input<Room[]>([]);
  searchTerm = signal<string>('');

  filteredRooms = computed<Room[]>(() => {
    if (this.searchTerm().length) {
      return this.rooms().filter(
        (room) =>
          room.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
          room.description
            .toLowerCase()
            .includes(this.searchTerm().toLowerCase())
      );
    }

    return this.rooms();
  });

  handleUpdateSearchTerm(updatedSearchTerm: string) {
    this.searchTerm.update(() => updatedSearchTerm);
  }
}
