import { Component, inject, OnInit } from '@angular/core';
import { IssuesService } from '../../../core/services/issues.service';
import { IssueItemComponent } from '../issue-item/issue-item.component';
import { IssuesStore } from '../../../store/issues.store';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [IssueItemComponent],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.scss',
})
export class IssuesListComponent {
  private store = inject(IssuesStore);

  issues = this.store.filteredIssues;
  loading = this.store.loading;

  onSelectIssue(issueId: string) {
    this.store.selectIssue(issueId);
  }
}
