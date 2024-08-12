import { Component, input } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-component-b',
  standalone: true,
  imports: [],
  templateUrl: './component-b.component.html',
  styleUrl: './component-b.component.css',
})
export class ComponentBComponent {
  title = input.required<string>();

  message = input.required<string>();

  messageFromService = '';
  titleFromService = '';
  constructor(private readonly messageService: MessageService) {}

  ngOnInit() {
    console.log('NG ON INIT');
    // const message = this.messageService.getMessage();
    // console.log('1. the message in component b from service', message);
    // this.messageFromService = message;

    this.titleFromService = this.messageService.componentBTitle;
    this.messageService.message.subscribe((value) => {
      console.log('Message in component B', value);

      this.messageFromService = value;
    });

    this.messageService.person.subscribe((value) => {
      console.log(value);
    });
  }
}
