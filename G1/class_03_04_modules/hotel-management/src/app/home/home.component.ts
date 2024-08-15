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
    let filteredRooms: Room[] = this.rooms();

    if (this.searchTerm().length) {
      filteredRooms = filteredRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
          room.description
            .toLowerCase()
            .includes(this.searchTerm().toLowerCase())
      );
    }

    if (this.guestCapacity() > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.guestCapacity >= this.guestCapacity()
      );
    }

    if (this.beds() > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.beds + room.extraBeds >= this.beds()
      );
    }

    if (this.board() !== Board.None) {
      filteredRooms = filteredRooms.filter(
        (room) => room.board === this.board()
      );
    }

    if (this.view() !== RoomView.None) {
      filteredRooms = filteredRooms.filter((room) => room.view === this.view());
    }

    if (this.parking() !== ParkingType.None) {
      filteredRooms = filteredRooms.filter(
        (room) => room.parking === this.parking()
      );
    }

    if (this.hasAirConditioning()) {
      filteredRooms = filteredRooms.filter((room) => room.hasAirConditioning);
    }

    if (this.isPetFriendly()) {
      filteredRooms = filteredRooms.filter((room) => room.isPetFriendly);
    }

    if (this.pricePerNightFrom() > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.pricePerNight >= this.pricePerNightFrom()
      );
    }

    if (this.pricePerNightTo() > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.pricePerNight <= this.pricePerNightTo()
      );
    }

    return filteredRooms;
  });

  handleUpdateSearchTerm(updatedSearchTerm: string) {
    this.searchTerm.update(() => updatedSearchTerm);
  }
}
