import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IssuesFiltersComponent } from './feature/issues/issues-filters/issues-filters.component';
import { IssuesListComponent } from './feature/issues/issues-list/issues-list.component';
import { IssuesDetailsComponent } from './feature/issues/issues-details/issues-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IssuesFiltersComponent,
    IssuesListComponent,
    IssuesDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'issue-tracker';
}
