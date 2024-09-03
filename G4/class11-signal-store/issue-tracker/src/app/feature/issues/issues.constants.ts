import { IssueStatus } from './issue.model';

export const filterBtnsConfig = [
  {
    status: IssueStatus.NEW,
    text: 'New',
  },
  {
    status: IssueStatus.IN_PROGRESS,
    text: 'In Progress',
  },
  {
    status: IssueStatus.COMPLETED,
    text: 'Completed',
  },
  {
    status: IssueStatus.ON_HOLD,
    text: 'On Hold',
  },
  {
    status: null,
    text: 'All',
  },
];
