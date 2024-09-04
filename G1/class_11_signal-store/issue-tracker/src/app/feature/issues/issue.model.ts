export enum IssueStatus {
  NEW = 'new',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on-hold',
}

export interface Issue {
  id: string;
  description: string;
  status: IssueStatus;
  assignee: string;
}
