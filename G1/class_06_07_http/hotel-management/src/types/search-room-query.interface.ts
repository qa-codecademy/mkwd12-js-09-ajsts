import { Board } from './board.enum';
import { ParkingType } from './parking-type.enum';
import { RoomView } from './room-view.enum';

export interface SearchRoomQuery {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  guestCapacity?: number;
  view?: RoomView;
  board?: Board;
  parking?: ParkingType;
  baths?: number;
  beds?: number;
  extraBeds?: number;
  isPetFriendly?: boolean;
  hasAirConditioning?: boolean;
  pricePerNightMin?: number;
  pricePerNightMax?: number;
}
