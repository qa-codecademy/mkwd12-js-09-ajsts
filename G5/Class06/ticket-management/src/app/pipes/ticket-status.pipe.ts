import { Pipe, PipeTransform } from '@angular/core';
import { TicketStatus } from '../types/ticket.interface';

@Pipe({
  name: 'ticketStatus', // the selector of the pipe
  standalone: true,
})
export class TicketStatusPipe implements PipeTransform {
  transform(value: TicketStatus): string {
    switch (value) {
      case TicketStatus.IN_DEVELOPMENT:
        return 'In Progress';
      case TicketStatus.DONE:
        return 'Completed';
      case TicketStatus.PENDING:
        return 'Pending';
      default:
        return value;
    }
  }
}
