import { Component, computed, input, signal } from '@angular/core';
import { Room } from '../../types/room.interface';
import { SearchComponent } from '../search/search.component';
import { RoomsComponent } from '../rooms/rooms.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { Board } from '../../types/board.enum';
import { RoomView } from '../../types/room-view.enum';
import { ParkingType } from '../../types/parking-type.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, RoomsComponent, CommonModule, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  rooms = input<Room[]>([]);
  searchTerm = signal<string>('');
  guestCapacity = signal<number>(1);
  beds = signal<number>(1);
  board = signal<Board>(Board.None);
  view = signal<RoomView>(RoomView.None);
  parking = signal<ParkingType>(ParkingType.None);
  pricePerNightFrom = signal<number>(1);
  pricePerNightTo = signal<number>(1000);
  hasAirConditioning = signal<boolean>(false);
  isPetFriendly = signal<boolean>(false);

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
