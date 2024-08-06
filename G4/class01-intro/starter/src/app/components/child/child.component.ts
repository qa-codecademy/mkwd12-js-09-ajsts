import {
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  //Old school way of input output with decorators
  // @Input() parentTitle: string;
  // @Output() titleOutput = new EventEmitter<string>();
  //New functional based input and output interface
  parentTitle = input<string>('');
  titleOutput = output<string>();

  onTitleSend() {
    console.log('title send called');
    this.titleOutput.emit('Title sent from child component');
  }
}
