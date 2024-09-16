import { Room } from './room.interface';

export interface CreateBooking {
  roomId: string;
  guestId: string;
  startDate: string;
  endDate: string;
}

export interface Booking extends CreateBooking {
  id: string;
  room: Room;
}