import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css',
})
export class CreateTicketComponent {
  constructor(private readonly ticketService: TicketService) {}

  possibleAssignees: string[] = [
    'John Doe',
    'Jane Doe',
    'Bob Bobski',
    'Steve Lee',
  ];

  title: string = '';
  description: string = '';
  assignee: string = this.possibleAssignees[0];

  clearInputs() {
    this.title = '';
    this.description = '';
    this.assignee = this.possibleAssignees[0];
  }

  handleSubmit() {
    console.log('title: ', this.title);
    console.log('description: ', this.description);
    console.log('assignee: ', this.assignee);

    this.ticketService.createTicket(
      this.title,
      this.description,
      this.assignee
    );
    this.clearInputs();
  }
}
