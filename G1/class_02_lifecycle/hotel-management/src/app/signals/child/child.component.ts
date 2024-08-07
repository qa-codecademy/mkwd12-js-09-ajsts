import {
  AfterViewInit,
  Component,
  effect,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  untracked,
} from '@angular/core';
import { GrandchildComponent } from '../grandchild/grandchild.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandchildComponent],
  template: `
    <h2>Child Component</h2>

    <p>Count: {{ counter() }}</p>
    <p>Age: {{ age() }}</p>
    <app-grandchild [name]="name()" (onAgeIncrease)="handleAgeIncrease()" />
  `,
})
export class ChildComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  counter = input<number>(0);
  name = input<string>('');
  age = signal<number>(1);

  handleAgeIncrease() {
    this.age.update((prevAge) => prevAge + 1);
  }

  constructor() {
    console.log('Child constructor');

    effect(() => {
      console.log('Child Component Effect init');
    });
    effect(() => {
      console.log('Child Component Effect counter', this.counter());

      untracked(() => {
        console.log('Child Component Effect name', this.name());
      });
    });

    effect((onCleanup) => {
      const timer = setTimeout(() => {
        console.log('1 second ago the component was initialized');
      }, 2000);
      onCleanup(() => {
        console.log('Child component cleanup');
        clearTimeout(timer);
      });
    });
  }

  ngOnInit(): void {
    console.log('Child OnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child OnChanges');
  }

  ngAfterViewInit(): void {
    console.log('Child AfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('Child OnDestroy');
  }
}
