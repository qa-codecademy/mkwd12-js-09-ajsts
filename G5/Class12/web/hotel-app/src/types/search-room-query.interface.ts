import { Board } from "./board.enum";
import { ParkingType } from "./parking-type.enum";
import { RoomType } from "./room-type.enum";
import { RoomView } from "./room-view.enum";
import { SortDirection } from "./sort-direction.enum";

export interface SearchRoomQuery {
  searchTerm?: string;
  type?: RoomType;
  pricePerNightMin?: number;
  pricePerNightMax?: number;
  beds?: number;
  extraBeds?: number;
  baths?: number;
  guestCapacity?: number;
  view?: RoomView;
  parking?: ParkingType,
  isPetFriendly?: boolean;
  board?: Board;
  hasAirConditioning?: boolean;
  availableFrom?: string;
  availableTo?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}