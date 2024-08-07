import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h1>Parent Component</h1>
    <button (click)="increment()">Increment</button>
    <button (click)="changeName()">Change Name</button>
    <button (click)="changeUntrackedValue()">Change Untracked Value</button>
    <button (click)="toggleShowChild()">
      {{ showChild ? 'Hide' : 'Show' }} Child
    </button>
    @if (showChild) {
    <app-child [counter]="counter" [name]="name" />
    }
  `,
})
export class ParentComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  counter: number = 0;
  name: string = 'Initial Name';
  untrackedValue: number = 0;
  showChild: boolean = false;

  increment() {
    this.counter += 1;
  }

  changeName() {
    this.name = 'Some Other Name';
  }

  changeUntrackedValue() {
    this.untrackedValue += 1;
  }

  toggleShowChild() {
    this.showChild = !this.showChild;
  }

  // Once on class initialization
  constructor() {
    console.log('Parent constructor');
  }

  // Once on component initialization
  ngOnInit() {
    console.log('Parent OnInit');
  }

  // Each time a change happens in the component
  ngOnChanges(changes: SimpleChanges) {
    console.log('Parent OnChanges', changes);
  }

  ngDoCheck() {
    console.log('Parent DoCheck');
  }

  ngAfterContentInit() {
    console.log('Parent AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('Parent AfterContentChecked');
  }

  // After the HTML is rendered
  ngAfterViewInit() {
    console.log('Parent AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Parent AfterViewChecked');
  }

  // Right before the component is closed/destroyed
  ngOnDestroy() {
    console.log('Parent OnDestroy');
  }
}
