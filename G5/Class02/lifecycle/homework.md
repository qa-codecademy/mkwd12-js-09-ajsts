# Homework 2 - Building an Angular App (Car Dealership)

## NOTE: If you implemented the homework from the previous class, feel free to work on top of it.

## Task: Enhance the Car Dealership App

### Requirements:

1. **Create a List of Cars in the App Component:**

   - Define a list of at least 2 cars.
   - Use the following `Car` interface:
     ```typescript
     interface Car {
       id: string; // e.g. '1', '2', etc.
       description: string; // e.g. 'Како нова, баба ја возела', etc.
       price: number; // e.g. 100000, 200000, etc.
       brand: string; // e.g. 'BMW', 'Mercedes', 'Audi', etc. (or use an enum)
       model: string; // e.g. 'X5', 'X7', 'S8', etc.
     }
     ```

2. **Create a New Component `Cars`:**

   - Display the `Cars` component in `app.component`.
   - The `Cars` component should accept one input, which is the list of cars.
   - Iterate through the list of cars and display them in the `Cars` component.

3. **Create a New Component `CreateCar`:**
   - Display the `CreateCar` component in `app.component`.
   - The `CreateCar` component should have 4 input fields for:
     - Description
     - Price
     - Brand
     - Model
   - Include a "Create" button in the `CreateCar` component.
   - When the "Create" button is clicked, it should create a new `Car` object that satisfies the `Car` interface.
   - Ensure that the newly created `Car` is displayed on the screen by providing it to the `Cars` component.

### Implementation Steps:

1. Define the `Car` interface in your app.
2. Create a list of cars in the `app.component.ts` file.
3. Create the `Cars` component and set up the necessary input property to accept the list of cars.
4. Iterate through the list of cars and display them in the `Cars` component template.
5. Create the `CreateCar` component with the required input fields and the "Create" button.
6. Implement the logic to create a new car object when the "Create" button is clicked.
7. Ensure the new car is added to the list and displayed in the `Cars` component.

By following these steps and requirements, you will enhance the Car Dealership app with additional functionality and improve the user experience.
