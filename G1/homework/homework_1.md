# Homework 1 - Building an Angular App (Car Dealership)

###### Deadline: 20.09.2024

## Task 1: Create a new Angular App

Create a new Angular app using the Angular CLI.

## Task 2: Create the following layout

The layout should contain the following components:

1. Header with (at least) the name of the Car Dealership e-store.
2. Navigation bar with at least the following links:
   - Home - Homepage with a list of cars for sale
   - About - Information about the Car Dealership
   - Contact - Contact information, email, phone number, address etc.

Structure the components as you see fit. Styling is not required, and up to you.

## Car model

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
	location: {
		// or interface
		city: string; // e.g. Skopje, etc.
		country: string; // e.g. Macedonia, etc.
	};
	brand: string; // e.g. BMW, Mercedes, Audi, etc. (or enum)
	model: string; // e.g. X5, X7, S8, etc.
	enginePower: number; // e.g. 150 (kW), 200 (kW), etc.
	doors: number; // e.g. 2, 3, 4, etc.
	seats: number; // e.g. 2, 4, 6, etc.
	transmission: string; // e.g. Manual, Automatic, etc. (or enum)
}
```

## Links for inspiration

- [Cars](https://www.cars.com/)
- [Car Hop](https://www.carhop.com/)
- [CarStoreUSA](https://www.carstoreusa.com/)
- [Autohaus24](https://www.autohaus24.de/)

## Before you send it

- Make sure you have a working Angular app
- Make sure you have node_modules in .gitignore
- Commit your code to a repository (preferably new)
- Send us a link to your repository (to the concrete folder, if you have multiple homeworks)
