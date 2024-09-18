import { faker } from '@faker-js/faker';
import { RoomType } from '../common/types/room-type.enum';
import { RoomView } from '../common/types/room-view.enum';
import { ParkingType } from '../common/types/parking-type.enum';
import { Board } from '../common/types/board.enum';
import { CreateRoomDto } from '../rooms/dto/create-room.dto';

export default function generateFakeRooms(count: number = 50): CreateRoomDto[] {
  const rooms: CreateRoomDto[] = [];

  for (let i = 0; i < count; i++) {
    rooms.push({
      name:
        faker.commerce.productAdjective() +
        ' ' +
        faker.helpers.arrayElement([
          'Room',
          'Suite',
          'Apartment',
          'Flat',
          'Townhouse',
          'Bungalow',
        ]),
      description: faker.commerce.productDescription(),
      type: faker.helpers.arrayElement(Object.values(RoomType)),
      pricePerNight: faker.number.float({
        min: 100,
        max: 500,
        fractionDigits: 2,
      }),
      beds: faker.number.int({ min: 1, max: 5 }),
      extraBeds: faker.number.int({ min: 0, max: 3 }),
      baths: faker.number.int({ min: 1, max: 5 }),
      guestCapacity: faker.number.int({ min: 1, max: 5 }),
      view: faker.helpers.arrayElement(Object.values(RoomView)),
      images: faker.helpers.arrayElements(
        [
          `./room-images/${faker.number.int({ min: 1, max: 24 })}.webp`,
          `./room-images/${faker.number.int({ min: 1, max: 24 })}.webp`,
          `./room-images/${faker.number.int({ min: 1, max: 24 })}.webp`,
          `./room-images/${faker.number.int({ min: 1, max: 24 })}.webp`,
          `./room-images/${faker.number.int({ min: 1, max: 24 })}.webp`,
        ],
        {
          min: 1,
          max: 5,
        },
      ),
      city: faker.location.city(),
      country: faker.location.country(),
      parking: faker.helpers.arrayElement(Object.values(ParkingType)),
      isPetFriendly: faker.datatype.boolean(),
      board: faker.helpers.arrayElement(Object.values(Board)),
      hasAirConditioning: faker.datatype.boolean(),
    });
  }

  return rooms;
}
