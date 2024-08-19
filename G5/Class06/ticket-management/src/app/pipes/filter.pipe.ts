import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../types/ticket.interface';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(tickets: Ticket[], searchValue: string): Ticket[] {
    if (!searchValue) return tickets;

    const filteredTickets = tickets.filter((ticket) =>
      ticket.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );

    return filteredTickets;
  }
}
