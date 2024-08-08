# Angular Lifecycle Methods and Signals

## Angular Lifecycle Methods

Angular components have a lifecycle managed by Angular. Angular creates, updates, and destroys components as the user interacts with the application. Angular offers several lifecycle hooks that provide visibility into these key moments.

### Lifecycle Hooks

1. **ngOnInit**

   - **Purpose:** Initialization logic that relies on the component's inputs.
   - **When it’s called:** Once, after the first `ngOnChanges`.
   - **Use case:** Fetch initial data, set up the component state.

   ```ts
   import { Component, OnInit } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements OnInit {
     ngOnInit() {
       console.log("ngOnInit called");
     }
   }
   ```

2. **ngOnChanges**

   - **Purpose:** Respond to changes in input properties.
   - **When it’s called:** Whenever data-bound input properties change.
   - **Use case:** Update internal state based on changes to inputs.

   ```typescript
   import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements OnChanges {
     @Input() data: any;

     ngOnChanges(changes: SimpleChanges) {
       console.log("ngOnChanges called", changes);
     }
   }
   ```

3. **ngDoCheck**

   - **Purpose:** Perform custom change detection.
   - **When it’s called:** During every change detection run.
   - **Use case:** Implement custom checks to detect changes that Angular may not catch.

   ```typescript
   import { Component, DoCheck } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements DoCheck {
     ngDoCheck() {
       console.log("ngDoCheck called");
     }
   }
   ```

4. **ngAfterContentInit**

   - **Purpose:** Respond after Angular projects external content into the component’s view.
   - **When it’s called:** Once, after Angular projects external content into the view.
   - **Use case:** Initialization logic that depends on projected content.

   ```typescript
   import { Component, AfterContentInit } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<ng-content></ng-content>",
   })
   export class ExampleComponent implements AfterContentInit {
     ngAfterContentInit() {
       console.log("ngAfterContentInit called");
     }
   }
   ```

5. **ngAfterContentChecked**

   - **Purpose:** Respond after Angular checks the projected content.
   - **When it’s called:** After every check of the projected content.
   - **Use case:** Logic that depends on the content projection checks.

   ```typescript
   import { Component, AfterContentChecked } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<ng-content></ng-content>",
   })
   export class ExampleComponent implements AfterContentChecked {
     ngAfterContentChecked() {
       console.log("ngAfterContentChecked called");
     }
   }
   ```

6. **ngAfterViewInit**

   - **Purpose:** Respond after Angular initializes the component’s views and child views.
   - **When it’s called:** Once, after the component’s views are initialized.
   - **Use case:** Initialization logic that depends on the component’s view.

   ```typescript
   import { Component, AfterViewInit } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements AfterViewInit {
     ngAfterViewInit() {
       console.log("ngAfterViewInit called");
     }
   }
   ```

7. **ngAfterViewChecked**

   - **Purpose:** Respond after Angular checks the component’s views and child views.
   - **When it’s called:** After every check of the component’s views.
   - **Use case:** Logic that depends on view checks.

   ```typescript
   import { Component, AfterViewChecked } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements AfterViewChecked {
     ngAfterViewChecked() {
       console.log("ngAfterViewChecked called");
     }
   }
   ```

8. **ngOnDestroy**

   - **Purpose:** Cleanup before the component is destroyed.
   - **When it’s called:** Once, just before the component is destroyed.
   - **Use case:** Unsubscribe from observables, detach event handlers, release resources.

   ```typescript
   import { Component, OnDestroy } from "@angular/core";

   @Component({
     selector: "app-example",
     template: "<p>Example Component</p>",
   })
   export class ExampleComponent implements OnDestroy {
     ngOnDestroy() {
       console.log("ngOnDestroy called");
     }
   }
   ```

## Angular Signals

Signals in Angular are a way to represent reactive values that can change over time. They allow you to manage state changes in a way that is easy to understand and reason about.

### Creating and Using Signals

To create a signal, you can use the `signal` function. Here's an example:

```typescript
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-signal-example",
  template: `
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class SignalExampleComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}
```

In this example:

- **signal:** Used to create a reactive signal.
- **count:** A signal that stores the count value.
- **increment:** A method that updates the count signal.
- **Template:** Displays the current count and includes a button to increment it.

### Input Signals

Input signals are used to pass reactive values into a component. They allow a component to react to changes in its inputs.

```typescript
import { Component, input } from "@angular/core";

@Component({
  selector: "app-child",
  template: "<p>Child Count: {{ count() }}</p>",
})
export class ChildComponent {
  count = input(0);
}

@Component({
  selector: "app-parent",
  template: `
    <app-child [count]="count()"></app-child>
    <button (click)="increment()">Increment</button>
  `,
})
export class ParentComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}
```

In this example:

- **ParentComponent:** Contains a `count` signal and an `increment` method.
- **ChildComponent:** Accepts the `count` signal as an input and displays its value.

### Output Signals

Output signals are used to emit reactive values from a component. They allow a component to communicate changes back to its parent.

```typescript
import { Component, output } from "@angular/core";

@Component({
  selector: "app-child",
  template: ` <button (click)="emitMessage()">Emit message</button> `,
})
export class ChildComponent {
  message = output<string>();

  emitMessage() {
    this.message.emit("Message to parent from child");
  }
}

@Component({
  selector: "app-parent",
  template: `
    <p>Parent reading child message: {{ messageFromChild }}</p>
    <app-child (message)="readMessage($event)"></app-child>
  `,
})
export class ParentComponent {
  messageFromChild = 0;

  readMessage(message: number) {
    this.messageFromChild = message;
  }
}
```

In this example:

- **ChildComponent:** Contains a `message` output signal and emits the message by triggering the `emitMessage` method. The `emitMessage` method itself is emitting the output singal `message`
- **ParentComponent:** Listens for the `message` event and updates its `messageFromChild` value.

### Benefits of Using Signals

- **Reactivity:** Signals make it easy to create reactive components that automatically update when state changes.
- **Simplicity:** Signals provide a simple and intuitive API for managing state.
- **Performance:** Signals can help improve the performance of your application by reducing unnecessary re-renders.
