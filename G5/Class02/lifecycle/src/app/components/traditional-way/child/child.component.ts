import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() counter = 0;
  @Input({ required: true }) name = '';
  @Output() message = new EventEmitter<string>();

  onMessageFromChild() {
    this.message.emit('Message from child');
  }

  constructor() {
    console.log('Child Component: constructor');
  }

  ngOnInit() {
    console.log('Child Component: ngOnInit');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Child Component: ngOnChanges', changes);
  }

  ngAfterContentInit() {
    console.log('Child Component: ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log('Child Component: ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('Child Component: ngOnDestroy');
  }
}
