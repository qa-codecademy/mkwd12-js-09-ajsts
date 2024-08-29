
## START THE SERVER
- Create .env file (check the .env-example)
 -Create an empty database - car_dealership
- Create admin user - find below the interface for a user
- Send post request to: http://localhost:3000/api/cars/backfill to fill the DB with data
#### Note: The guards are already commented out so that you can use the server without authorization.

## HOMEWORK REQUIREMENTS
- Create a new angular app (we will be using the previous car dealership app as an isnpiration for the new one, but we will implement few changes)
- Create all the relevant components like navbar, home, cars etc.
- Create new car interface to fit the model from the server - find below the interface for a car
- Create a car service to fetch the data from the server by sending a GET request to the api specified in the server
- Fetch cars into the cars component and display them in the template using async pipe
- Feel free to add additional info about each car in the car card
- Use angular material components like mat-grid, mat-card, mat-button to display the cars data on the UI

### User model example
``` 
  {
    "role": "Admin",
    "id": (uuid) - do not send id when creating the user, the server will create it
    "email": "admin@example.com",
    "password": "Pas$w0rd"
  }
```

### Car model

```ts
interface Car {
  id: string; // e.g.
  description: string; // e.g. Како нова, баба ја возела, etc.
  price: number; // e.g. 100.000, 200.000, etc.
  images: string[]; // array of image URLs
  type: 'Sedan' | 'SUV' | 'Coupe' | 'Hatchback' | 'Convertible'; //...etc. (or enum)
  year: number; // e.g. 2022, 2023, 2024, etc.
  color: string; // e.g. White, Black, Red, etc. (or enum)
  fuelType: 'Petrol' | 'Diesel' | 'Electric'; //...etc. (or enum)
  distance: number; // e.g. 100.000, 200.000, etc.
  isNew: boolean; // true or false
  location: { // or interface
    city: string; // e.g. Skopje, etc.
    country: string;  // e.g. Macedonia, etc.
  },
  brand: string; // e.g. BMW, Mercedes, Audi, etc. (or enum)
  model: string; // e.g. X5, X7, S8, etc.
  enginePower: number; // e.g. 150 (kW), 200 (kW), etc.
  doors: number; // e.g. 2, 3, 4, etc.
  seats: number; // e.g. 2, 4, 6, etc.
  transmission: string; // e.g. Manual, Automatic, etc. (or enum)
}
```