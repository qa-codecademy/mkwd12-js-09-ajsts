export enum TicketStatus {
  PENDING = 'PEDING',
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  DONE = 'DONE',
}

export interface Ticket {
  id: string;
  description: string;
  title: string;
  assignee: string;
  createdAt: Date;
  status: TicketStatus;
}
