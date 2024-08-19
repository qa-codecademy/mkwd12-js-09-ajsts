import { Component, signal } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../types/ticket.interface';
import { TicketComponent } from '../ticket/ticket.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets = signal<Ticket[]>([]);
  interval: any;

  private subscriptions: Subscription[];
  constructor(private readonly ticketService: TicketService) {}

  ngOnInit() {
    const ticketSubscription = this.ticketService.tickets$.subscribe((data) => {
      // WITHOUT USING SINGAL
      // this.tickets = data;

      console.log('SUBSCRIBE IN TICKETS');
      // WITH SIGNAL SYNTAX
      this.tickets.set(data);
    });

    this.subscriptions.push(ticketSubscription);

    this.interval = setInterval(() => {
      console.log('Expensive task');
    }, 1000);
  }

  ngOnDestroy() {
    console.log('On Destroy');
    clearInterval(this.interval);

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
