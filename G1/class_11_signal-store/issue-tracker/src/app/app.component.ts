import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssueFiltersComponent } from './feature/issues/issue-filters/issue-filters.component';
import { IssuesListComponent } from './feature/issues/issues-list/issues-list.component';
import { IssueDetailsComponent } from './feature/issues/issue-details/issue-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IssueFiltersComponent,
    IssuesListComponent,
    IssueDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'issue-tracker';
}
