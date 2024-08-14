import { Component, signal } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../types/ticket.interface';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  // tickets: Ticket[] = [];

  tickets = signal<Ticket[]>([]);

  constructor(private readonly ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.tickets$.subscribe((data) => {
      console.log(data);

      // WITHOUT USING SINGAL
      // this.tickets = data;

      // WITH SIGNAL SYNTAX
      this.tickets.set(data);
    });
  }
}
