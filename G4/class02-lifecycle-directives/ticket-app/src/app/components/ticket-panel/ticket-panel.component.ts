import { Component, input, OnInit, signal } from '@angular/core';
import { Ticket, TicketStatus } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';

@Component({
  selector: 'app-ticket-panel',
  standalone: true,
  imports: [CommonModule, TicketComponent, TicketDetailsComponent],
  templateUrl: './ticket-panel.component.html',
  styleUrl: './ticket-panel.component.scss',
})
export class TicketPanelComponent implements OnInit {
  readonly ticketStatus = TicketStatus;

  isTitleShown = signal(false);
  ticketList = input<Ticket[]>([]);
  filteredTickets = signal<Ticket[]>([]);
  selectedTicket = signal<Ticket>(null);
  isDetailsShown = signal(false);

  constructor() {
    console.log('constructor', this.ticketList());
  }

  ngOnInit() {
    console.log('on init', this.ticketList());
    this.filteredTickets.set(this.ticketList());

    console.log(this.filteredTickets());
  }

  filterTicketsByStatus(status: TicketStatus) {
    this.filteredTickets.set(
      this.ticketList().filter((ticket) => ticket.status === status),
    );
    this.isDetailsShown.set(false);
  }

  toggleTitleShown() {
    this.isTitleShown.update((prev) => !prev);
    console.log(this.isTitleShown());
  }

  onTicketSelect(ticket: Ticket) {
    this.selectedTicket.set(ticket);
    console.log(this.selectedTicket());
    this.isDetailsShown.set(true);
  }
}
