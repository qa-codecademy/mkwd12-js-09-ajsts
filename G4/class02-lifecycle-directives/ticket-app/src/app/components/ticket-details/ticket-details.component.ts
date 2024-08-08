import { Component, input, OnDestroy, output } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnDestroy {
  selectedTicket = input<Ticket>(null);

  hideOutput = output();

  onClearClick() {
    this.hideOutput.emit();
  }

  ngOnDestroy(): void {
    console.log('ticket details destroy called');
  }
}
