import { Component, input } from '@angular/core';
import { Ticket, TicketStatus } from '../../types/ticket.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { TicketStatusPipe } from '../../pipes/ticket-status.pipe';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, TicketStatusPipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();

  statuses: TicketStatus[] = Object.values(TicketStatus);

  selectedStatus: TicketStatus;

  constructor(private readonly ticketService: TicketService) {}

  ngOnInit() {
    this.selectedStatus = this.ticket().status;
  }

  onSelectedStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as TicketStatus;

    this.ticketService.updateTicketStatus(this.ticket().id, newStatus);
  }

  onRemoveTicket() {
    this.ticketService.removeTicket(this.ticket().id);
  }
}
