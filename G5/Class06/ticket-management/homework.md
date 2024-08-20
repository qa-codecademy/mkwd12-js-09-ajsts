# Homework 4 - Angular App Enhancement: Car Dealership

## Objective: Elevate Your Car Dealership App

### Overview

In this assignment, you'll enhance the Car Dealership app by incorporating advanced Angular features. If you’ve already implemented the previous homework (Class 5), you can build upon that foundation.

### Requirements

1. **Currency Formatting with Pipes:**

   - In the car information card, enhance the display of prices using Angular Pipes.
   - Example: Convert a price like `4000` into a more readable format, such as `€4,000.00`.
   - _Hint:_ Utilize Angular's built-in `CurrencyPipe`. Refer to [Angular documentation](https://angular.dev/guide/pipes#) for guidance.

2. **Custom Pipe for Filtering Cars by Brand:**
   - Develop a custom pipe that filters cars based on a search input value.
   - Focus on filtering by the car's `brand`.
3. **Real-time Filtering in the Cars Component:**
   - Implement an input field in the cars component.
   - As the user types, the custom pipe should be invoked, dynamically filtering the cars displayed based on the entered brand.

### Bonus Challenge

- **Extended Filtering with Price Range:**
  - In addition to the brand filter, introduce two additional input fields: `fromPrice` and `toPrice`.
  - Extend your custom pipe to also filter cars based on these price ranges.
  - If users provide values for `brand`, `fromPrice`, and `toPrice`, your app should display only the cars that match all the specified criteria.

Good luck, and have fun coding!
