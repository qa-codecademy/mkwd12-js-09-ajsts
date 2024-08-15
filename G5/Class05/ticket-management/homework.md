# Homework 3 - Building an Angular App (Car Dealership)

## Task: Enhance the Car Dealership App

### Instructions

If you implemented the homework from the previous class (Class 2), feel free to build on top of it.

### Requirements

1. **Create a List of Cars in the App Component**

   - Define a list of at least 2 cars.
   - Use the following `Car` interface:

     ```typescript
     interface Car {
       id: string; // e.g., '1', '2', etc.
       description: string; // e.g., 'Како нова, баба ја возела', etc.
       price: number; // e.g., 100000, 200000, etc.
       brand: string; // e.g., 'BMW', 'Mercedes', 'Audi', etc. (or use an enum)
       model: string; // e.g., 'X5', 'X7', 'S8', etc.
     }
     ```

2. **Create a Header Component**

   - The header should contain three navigation options: **Home**, **Cars**, and **Create Car**.

3. **Implement Routing**

   - Create the following components: **Home**, **Cars**, **Create Car**.
   - Set up routing so that when a navigation item is clicked, the corresponding component is displayed.
     - When **Home** is clicked, the Home component should be displayed.
     - When **Cars** is clicked, the Cars component should be displayed.
     - When **Create Car** is clicked, the Create Car component should be displayed.

   _Note: If you have completed the previous homework, you may already have these components._

4. **Create a Service Named `CarsDealershipService`**

   - In this service, create a `BehaviorSubject` that holds a few cars as dummy data.
   - In the Cars component, subscribe to this service to read data from the observable and display it in the UI.

5. **Implement Create Car Functionality**

   - In the Create Car component, create a form with 4 inputs:
     - Description
     - Price
     - Brand
     - Model
   - The newly created car should be added to the list of cars and displayed in the Cars component.

   **Bonus:** Add an input for the car image, which allows you to provide a URL to an image of the car.

### Bonus Task

- **Implement Remove Car Functionality**
  - In the Cars component, add a button to each car card that, when clicked, removes the car from the list.

---

Good luck, and happy coding! 🚗
