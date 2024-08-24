export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  passportNumber: string;
  createdAt: Date;
  userId: string;
  bookings: any[];
}

export type CreateGuest = Omit<
  Guest,
  'id' | 'userId' | 'bookings' | 'createdAt'
>;

//   "firstName": "John",
// "lastName": "Doe",
// "email": "john.doe@example.com",
// "dateOfBirth": "1990-01-01",
// "phone": "+38970223305",
// "address": "Ilindenska 1, Skopje, Macedonia",
// "passportNumber": "A123456789"
