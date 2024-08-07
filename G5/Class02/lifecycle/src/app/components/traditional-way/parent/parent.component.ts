import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  title = 'Parent Component';
  count = 0;
  name = 'Some initial name value';
  childMessage = '';

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  handleChangeName(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.name = value;
  }

  readMessageFromChild(value: string) {
    console.log('Success read message from child: ', value);
    this.childMessage = value;
  }

  constructor() {
    console.log('Parent Component: constructor');
  }

  ngOnInit() {
    console.log('Parent Component: ngOnInit');
  }

  ngOnChanges() {
    console.log('Parent Component: ngOnChanges');
  }

  ngAfterContentInit() {
    console.log('Parent Component: ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log('Parent Component: ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('Parent Component: ngOnDestroy');
  }
}
