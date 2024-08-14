# Module plan - Building the app (Using modules structure VS Standalone Components)

In this class we will learn about the different ways to structure our Angular application. We will start with the older way of using modules, and then we will move to the new way of using standalone components.

We will also add Angular Material and start slowly using it's components and icons while building the hotel management app. During this class we will also see examples of using signals and practical examples of using standalone components.

## Commands to run

### Building the app using modules structure

let's see how the module structure looks like. We are going to use this example to show how to structure our app using modules, but the actual implementation will be different using the modern way of using standalone components.

1. ng new --no-standalone hotel-management-with-modules
2. ng generate module rooms
3. ng generate component rooms
4. ng generate component room
5. ng generate service guest
6. ng generate module guests
7. ng generate component guests
8. ng generate component guest
9. ng generate service room

### Building the app using standalone components

1. ng new hotel-management
2. ng generate component dashboard
3. ng generate component rooms
4. ng generate component room
5. ng generate component header
6. ng generate component navbar
7. ng generate component search
8. ng generate component filters
9. ng generate component home

### (Optional) Using Tailwind CSS

Follow the instructions in the [official documentation](https://tailwindcss.com/docs/guides/angular) to install Tailwind CSS and integrate it into our project.

### (Optional) Using Angular Material

1. ng add @angular/material

Additional info here: https://material.angular.io/guide/getting-started

## Useful links

- [Angular Modules](https://v17.angular.io/guide/ngmodules)
- [Standalone Components](https://v17.angular.io/guide/standalone-components)
- [Angular Standalone Components: Complete Guide](https://blog.angular-university.io/angular-standalone-components/)
- [Using Standalone Components](https://angular.dev/guide/components/importing)
