import { Component, inject, OnInit } from '@angular/core';
import { IssuesService } from '../../../core/services/issues.service';
import { IssuesItemComponent } from '../issues-item/issue-item.component';
import { IssuesStore } from '../../../store/issues.store';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [IssuesItemComponent],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.scss',
})
export class IssuesListComponent implements OnInit {
  private store = inject(IssuesStore);

  filteredIssues = this.store.filteredIssues;
  loading = this.store.loading;

  ngOnInit() {
    this.store.loadIssues();
  }

  onSelectIssue(issueId: string) {
    this.store.selectIssue(issueId);
  }
}
