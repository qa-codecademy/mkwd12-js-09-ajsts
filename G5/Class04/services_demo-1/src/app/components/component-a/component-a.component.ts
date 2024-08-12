import { Component, input, output } from '@angular/core';
import { ComponentCComponent } from '../component-c/component-c.component';

@Component({
  selector: 'app-component-a',
  standalone: true,
  imports: [ComponentCComponent],
  templateUrl: './component-a.component.html',
  styleUrl: './component-a.component.css',
})
export class ComponentAComponent {
  title = input.required<string>(); // input signal

  componentCTitle = input.required<string>();
  messageFromA = output<string>();

  onMessageEmitted(message: string) {
    console.log(
      'I listen to the message from component C; message is:',
      message
    );

    this.messageFromA.emit(message);
  }
}
