import { Board } from './board.enum';
import { ParkingType } from './parking-type.enum';
import { RoomType } from './room-type.enum';
import { RoomView } from './room-view.enum';

export interface Room {
  id: string;
  name: string;
  description: string;
  type: RoomType;
  pricePerNight: number;
  beds: number;
  extraBeds: number;
  baths: number;
  guestCapacity: number;
  view: RoomView;
  images: string[];
  city: string;
  country: string;
  parking: ParkingType;
  isPetFriendly: boolean;
  board: Board;
  hasAirConditioning: boolean;
}
