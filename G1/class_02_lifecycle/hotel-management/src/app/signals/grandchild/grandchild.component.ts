import {
  AfterViewInit,
  Component,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-grandchild',
  standalone: true,
  imports: [],
  template: `<h3>Grandchild Component</h3>
    <p>{{ name() }}</p>
    <button (click)="increaseAge()">Increase age</button>`,
})
export class GrandchildComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  name = input('');
  onAgeIncrease = output();

  increaseAge() {
    this.onAgeIncrease.emit();
  }

  constructor() {
    console.log('Grandchild constructor');
  }

  ngOnInit(): void {
    console.log('Grandchild OnInit');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Grandchild OnChanges');
  }

  ngAfterViewInit(): void {
    console.log('Grandchild AfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('Grandchild OnDestroy');
  }
}
