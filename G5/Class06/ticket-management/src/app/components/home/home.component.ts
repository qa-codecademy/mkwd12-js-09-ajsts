import { Component, signal } from '@angular/core';
import { TicketComponent } from '../ticket/ticket.component';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../types/ticket.interface';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketComponent, FilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tickets = signal<Ticket[]>([]);
  searchValue = signal('');

  private subscription: Subscription;

  constructor(private readonly ticketService: TicketService) {}

  ngOnInit() {
    this.subscription = this.ticketService.tickets$.subscribe((tickets) => {
      console.log('SUBSCRIBE IN HOME');
      this.tickets.set(tickets);
    });
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    console.log(value);

    this.searchValue.set(value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
