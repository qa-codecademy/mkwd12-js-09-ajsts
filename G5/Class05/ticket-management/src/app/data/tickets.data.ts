import { Ticket, TicketStatus } from '../types/ticket.interface';

export const TICKETS_DATA: Ticket[] = [
  {
    id: '1',
    title: 'Ticket title 1',
    description: 'Description ticket 1',
    assignee: 'John Doe',
    status: TicketStatus.PENDING,
    createdAt: new Date('12-08-2024'),
  },
  {
    id: '2',
    title: 'Ticket title 2',
    description: 'Description ticket 2',
    assignee: 'Jane Doe',
    status: TicketStatus.PENDING,
    createdAt: new Date('11-08-2024'),
  },
  {
    id: '3',
    title: 'Ticket title 3',
    description: 'Description ticket 3',
    assignee: 'John Doe',
    status: TicketStatus.DONE,
    createdAt: new Date('09-08-2024'),
  },
  {
    id: '4',
    title: 'Ticket title 4',
    description: 'Description ticket 4',
    assignee: 'Steve Lee',
    status: TicketStatus.IN_DEVELOPMENT,
    createdAt: new Date('12-08-2024'),
  },
];
