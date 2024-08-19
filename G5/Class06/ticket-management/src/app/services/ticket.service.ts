import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TICKETS_DATA } from '../data/tickets.data';
import { Ticket, TicketStatus } from '../types/ticket.interface';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private _tickets = new BehaviorSubject(TICKETS_DATA);
  tickets$ = this._tickets.asObservable();

  constructor() {}

  createTicket(
    ticketTitle: string,
    ticketDescription: string,
    ticketAssignee: string
  ) {
    const ticket: Ticket = {
      id: uuid(),
      title: ticketTitle,
      description: ticketDescription,
      assignee: ticketAssignee,
      createdAt: new Date(),
      status: TicketStatus.PENDING,
    };

    const tickets = this._tickets.value;

    console.log(ticket);
    this._tickets.next([...tickets, ticket]);
  }

  updateTicketStatus(ticketId: string, newStatus: TicketStatus) {
    const tickets = this._tickets.getValue().map((ticket) => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
        };
      }
      return ticket;
    });

    this._tickets.next(tickets);
  }

  removeTicket(ticketId: string) {
    const remainingTickets = this._tickets.getValue().filter((ticket) => {
      return ticket.id !== ticketId;
    });

    this._tickets.next(remainingTickets);
  }
}
