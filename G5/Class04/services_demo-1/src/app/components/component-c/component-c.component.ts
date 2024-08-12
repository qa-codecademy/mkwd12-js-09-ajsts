import { Component, input, output } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-component-c',
  standalone: true,
  imports: [],
  templateUrl: './component-c.component.html',
  styleUrl: './component-c.component.css',
})
export class ComponentCComponent {
  title = input.required<string>();
  message = output<string>(); // output signal

  // same if we do : messageService = new MessageService()
  // IMPORTANT! Using DI is better =)
  constructor(private readonly messageService: MessageService) {}

  sendMessage() {
    // Way 1: Using outputs
    // this.message.emit('Hello from component C! :)');

    // Way 2: Using the service to transfer the message
    this.messageService.setMessage('Hello from component C! :)');
  }
}
