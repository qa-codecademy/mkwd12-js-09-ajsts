import { Component, inject } from '@angular/core';
import { filterBtnsConfig } from '../issue.constants';
import { NgClass } from '@angular/common';
import { IssuesService } from '../../../core/services/issues.service';
import { IssuesStore } from '../../../store/issues.store';
import { IssueStatus } from '../issue.model';

@Component({
  selector: 'app-issue-filters',
  standalone: true,
  imports: [NgClass],
  templateUrl: './issue-filters.component.html',
  styleUrl: './issue-filters.component.scss',
})
export class IssueFiltersComponent {
  store = inject(IssuesStore);

  filterBtnsConfig = filterBtnsConfig;

  onChangeFilter(filter: IssueStatus | null) {
    this.store.changeFilter(filter);
  }
}
