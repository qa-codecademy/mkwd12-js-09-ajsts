import { Component, inject } from '@angular/core';
import { filterBtnsConfig } from '../issues.constants';
import { NgClass } from '@angular/common';
import { IssueStatus } from '../issue.model';
import { IssuesService } from '../../../core/services/issues.service';
import { IssuesStore } from '../../../store/issues.store';

@Component({
  selector: 'app-issues-filters',
  standalone: true,
  imports: [NgClass],
  templateUrl: './issues-filters.component.html',
  styleUrl: './issues-filters.component.scss',
})
export class IssuesFiltersComponent {
  private store = inject(IssuesStore);

  filterBtnsConfig = filterBtnsConfig;

  onChangeFilter(filter: IssueStatus) {
    this.store.changeFilter(filter);
  }
}
