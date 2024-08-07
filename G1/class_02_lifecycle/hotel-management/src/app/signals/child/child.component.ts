import {
  AfterViewInit,
  Component,
  effect,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: `
    <h2>Child Component</h2>

    <p>{{ counter() }}</p>
  `,
})
export class ChildComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  counter = input<number>(0);

  constructor() {
    console.log('Child constructor');

    effect(() => {
      console.log('Child Component Effect init');
    });
    effect(() => {
      console.log('Child Component Effect counter', this.counter());
    });

    effect((onCleanup) => {
      const timer = setTimeout(() => {
        console.log('1 second ago the component was destroyed');
      }, 1000);
      onCleanup(() => {
        console.log('Child component cleanup');
        clearTimeout(timer);
      });
    }, {});
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
