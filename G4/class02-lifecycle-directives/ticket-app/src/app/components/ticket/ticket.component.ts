import { Component, EventEmitter, input, output } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  // @Output() ticketOutput = new EventEmitter<Ticket>()
  ticketOutput = output<Ticket>();

  onTicketClick() {
    this.ticketOutput.emit(this.ticket());
  }
}
