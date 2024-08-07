import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-grandchild',
  standalone: true,
  imports: [],
  template: `<h3>Grandchild Component</h3>
    <p>{{ name }}</p>
    <button (click)="increaseAge()">Add 1 year to age</button> `,
})
export class GrandchildComponent
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
  @Input() name: string = '';
  @Output() onAgeIncrease: EventEmitter<void> = new EventEmitter<void>();

  // Once on class initialization
  constructor() {
    console.log('Grandchild constructor');
  }

  increaseAge() {
    this.onAgeIncrease.emit();
  }

  // Once on component initialization
  ngOnInit() {
    console.log('Grandchild OnInit');
  }

  // Each time a change happens in the component
  ngOnChanges(changes: SimpleChanges) {
    console.log('Grandchild OnChanges', changes);
  }

  ngDoCheck() {
    console.log('Grandchild DoCheck');
  }

  ngAfterContentInit() {
    console.log('Grandchild AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('Grandchild AfterContentChecked');
  }

  // After the HTML is rendered
  ngAfterViewInit() {
    console.log('Grandchild AfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('Grandchild AfterViewChecked');
  }

  // Right before the component is closed/destroyed
  ngOnDestroy() {
    console.log('Grandchild OnDestroy');
  }
}
