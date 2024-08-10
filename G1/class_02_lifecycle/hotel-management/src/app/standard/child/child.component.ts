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
  Input,
} from '@angular/core';
import { GrandchildComponent } from '../grandchild/grandchild.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandchildComponent],
  providers: [],
  template: `
    <h2>Child Component</h2>
    <p>Count {{ counter }}</p>
    <button (click)="logSomething()">Log Something</button>
    <p>Age {{ age }}</p>
    <app-grandchild [name]="name" (onAgeIncrease)="handleAgeIncrease()" />
  `,
})
export class ChildComponent
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
  @Input() counter: number = 0;
  @Input() name: string = '';

  age: number = 1;

  handleAgeIncrease() {
    this.age += 1;
  }

  logSomething() {
    console.log('Something from child component!');
  }

  // Once on class initialization
  constructor() {
    console.log('Child constructor');
  }

  // Once on component initialization
  ngOnInit() {
    console.log('Child OnInit');
  }

  // Each time a change happens in the component
  ngOnChanges(changes: SimpleChanges) {
    console.log('Child OnChanges', changes);
  }

  ngDoCheck() {
    console.log('Child DoCheck');
  }

  ngAfterContentInit() {
    console.log('Child AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('Child AfterContentChecked');
  }

  // After the HTML is rendered
  ngAfterViewInit() {
    console.log('Child AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Child AfterViewChecked');
  }

  // Right before the component is closed/destroyed
  ngOnDestroy() {
    console.log('Child OnDestroy');
  }
}
