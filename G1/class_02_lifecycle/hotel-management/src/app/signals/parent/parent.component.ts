import {
  AfterViewInit,
  Component,
  computed,
  effect,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <h1>Parent Component</h1>
    <button (click)="incrementCount()">Increment Counter</button>
    <button (click)="changeName()">Change Name</button>
    <button (click)="toggleChild()">Toggle Child</button>
    <p>Name: {{ name() }}</p>
    <p>Name Length: {{ nameLength() }}</p>
    @if (showChild()) {
    <app-child [counter]="counter()" />
    }
  `,
})
export class ParentComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  counter = signal<number>(0);
  name = signal<string>('Initial Name');
  showChild = signal<boolean>(false);

  nameLength = computed(() => this.name().length);

  toggleChild() {
    this.showChild.update((prevValue) => !prevValue);
  }

  incrementCount() {
    // this.counter += 1;
    // this.counter.update(() => this.counter() + 1);
    this.counter.update((previousValue) => previousValue + 1);
  }

  changeName() {
    this.name.update(() => 'Some Other Name');
  }

  constructor() {
    console.log('Parent constructor');

    effect(() => {
      console.log('Parent effect');

      console.log('Current value of counter is:', this.counter());
    });
  }

  ngOnInit(): void {
    console.log('Parent OnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Parent OnChanges');
  }

  ngAfterViewInit(): void {
    console.log('Parent AfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('Parent OnDestroy');
  }
}
